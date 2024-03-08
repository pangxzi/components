import { useUncontrolled } from '@/hooks/use-uncontrolled';
import { assignRef } from '@/utils/assignRef';
import { createPinArray } from '@/utils/createPinArray';
import type { FlexProps, InputProps, InputRef } from 'antd';
import { Flex, Input } from 'antd';
import { forwardRef, useEffect, useRef, useState, type HTMLInputTypeAttribute } from 'react';
import { useStyles } from './style';

const regex = {
  number: /^[0-9]+$/,
  alphanumeric: /^[a-zA-Z0-9]+$/i,
};

export interface PinInputProps extends InputProps {
  /** 隐藏输入的 `name` 属性 */
  name?: string;

  /** 用于设置输入之间的间距的 `theme.spacing` 键或任何有效的 CSS 值，数字将转换为 rem， 默认为 `'md'` */
  gap?: FlexProps['gap'];

  /** 控制输入的 `width` 和 `height`，默认为 `'middle'` */
  size?: InputProps['size'];

  /** 如果设置为 true，在组件挂载时第一个输入将获得焦点，默认为 `false` */
  autoFocus?: boolean;

  /** 受控组件的值 */
  value?: string;

  /** 未受控组件的默认值 */
  defaultValue?: string;

  /** 当所有输入都有值时调用 */
  onComplete?: (value: string) => void;

  /** 输入占位符，默认为 `'○'` */
  placeholder?: string;

  /** 确定是否在填充后自动将焦点移动到下一个输入，默认为 `true` */
  manageFocus?: boolean;

  /** 确定是否在所有输入上设置 `autocomplete="one-time-code"` 属性，默认为 `true` */
  oneTimeCode?: boolean;

  /** 用于所有输入的基础 id。默认情况下，输入的 id 将随机生成。 */
  id?: string;

  /** 如果设置，将 `disabled` 属性添加到所有输入 */
  disabled?: boolean;

  /** 确定可输入哪些值，默认为 `'alphanumeric'` */
  pinType?: 'alphanumeric' | 'number' | RegExp;

  /** 将输入类型更改为 `"password"`，默认为 `false` */
  mask?: boolean;

  /** 输入的数量，默认为 `4` */
  length?: number;

  /** 如果设置，用户将无法编辑值 */
  readOnly?: boolean;

  /** 输入的 `type` 属性，如果未指定，则从 `type` prop 推断 */
  inputType?: HTMLInputTypeAttribute;

  /** `inputmode` 属性，如果未指定，则从 `type` prop 推断 */
  inputMode?:
    | 'none'
    | 'text'
    | 'tel'
    | 'url'
    | 'email'
    | 'numeric'
    | 'decimal'
    | 'search'
    | undefined;

  /** 用于自定义输入框样式的 CSS 属性 */
  inputStyle?: React.CSSProperties;

  /** 用于自定义容器样式的 CSS 属性 */
  containerStyle?: React.CSSProperties;
}

const PinInput = forwardRef<InputRef, PinInputProps>(
  (
    {
      name,
      form,
      value,
      defaultValue,
      variant,
      gap = 'middle',
      size = 'middle',
      length = 4,
      onChange,
      onComplete,
      manageFocus = true,
      autoFocus,
      status,
      disabled,
      oneTimeCode = true,
      placeholder,
      pinType = 'alphanumeric',
      mask,
      readOnly,
      inputType,
      inputMode,
      inputStyle,
      containerStyle,
      id,
      ...rest
    },
    ref,
  ) => {
    const _id = id;

    const { cx, styles } = useStyles();

    const [focusedIndex, setFocusedIndex] = useState(-1);

    const [_value, setValues] = useUncontrolled<string[]>({
      value: value ? createPinArray(length ?? 0, value) : undefined,
      defaultValue: defaultValue?.split('').slice(0, length ?? 0),
      finalValue: createPinArray(length ?? 0, ''),
      onChange:
        typeof onChange === 'function'
          ? (val) => {
              onChange(val.join('').trim() as any);
            }
          : undefined,
    });

    const _valueToString = _value.join('').trim();

    const inputsRef = useRef<Array<InputRef>>([]);

    const validate = (code: string) => {
      const re =
        pinType instanceof RegExp ? pinType : pinType && pinType in regex ? regex[pinType] : null;
      return re?.test(code);
    };

    const focusInputField = (dir: 'next' | 'prev', index: number) => {
      if (!manageFocus) return;

      if (dir === 'next') {
        const nextIndex = index + 1;
        inputsRef.current[nextIndex < (length ?? 0) ? nextIndex : index].focus({ cursor: 'all' });
      }

      if (dir === 'prev') {
        const nextIndex = index - 1;

        inputsRef.current[nextIndex > -1 ? nextIndex : index].focus({ cursor: 'all' });
      }
    };

    const setFieldValue = (val: string, index: number) => {
      const values = [..._value];
      values[index] = val;
      setValues(values);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
      const inputValue = event.target.value;
      const nextCharOrValue =
        inputValue.length === 2 ? inputValue.split('')[inputValue.length - 1] : inputValue;

      const isValid = validate(nextCharOrValue);
      if (nextCharOrValue.length < 2) {
        if (isValid) {
          setFieldValue(nextCharOrValue, index);
          focusInputField('next', index);
        } else {
          setFieldValue('', index);
        }
      } else if (isValid) {
        setValues(createPinArray(length ?? 0, inputValue));
      }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
      const { ctrlKey, key, shiftKey, target } = event;
      const inputValue = (target as HTMLInputElement).value;
      if (inputMode === 'numeric') {
        const canTypeSign =
          key === 'Backspace' ||
          key === 'Tab' ||
          key === 'Control' ||
          key === 'Delete' ||
          (ctrlKey && key === 'v')
            ? true
            : !Number.isNaN(Number(key));

        if (!canTypeSign) {
          event.preventDefault();
        }
      }

      if (key === 'ArrowLeft' || (shiftKey && key === 'Tab')) {
        event.preventDefault();
        focusInputField('prev', index);
      } else if (key === 'ArrowRight' || key === 'Tab' || key === ' ') {
        event.preventDefault();
        focusInputField('next', index);
      } else if (key === 'Delete') {
        event.preventDefault();
        setFieldValue('', index);
      } else if (key === 'Backspace') {
        event.preventDefault();
        setFieldValue('', index);
        if (length === index + 1) {
          if ((event.target as HTMLInputElement).value === '') {
            focusInputField('prev', index);
          }
        } else {
          focusInputField('prev', index);
        }
      } else if (inputValue.length > 0 && key === _value[index]) {
        event.preventDefault();
        focusInputField('next', index);
      }
    };

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>, index: number) => {
      event.target.select();
      setFocusedIndex(index);
    };

    const handleBlur = () => {
      setFocusedIndex(-1);
    };

    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
      event.preventDefault();
      const copyValue = event.clipboardData.getData('text/plain').replace(/[\n\r\s]+/g, '');
      const isValid = validate(copyValue.trim());

      if (isValid) {
        const copyValueToPinArray = createPinArray(length ?? 0, copyValue);
        setValues(copyValueToPinArray);
        focusInputField('next', copyValueToPinArray.length - 1);
      }
    };

    useEffect(() => {
      if (_valueToString.length !== length) return;
      onComplete?.(_valueToString);
    }, [length, _valueToString]);

    useEffect(() => {
      if (length !== _value.length) {
        setValues(createPinArray(length ?? 0, _value.join('')));
      }
    }, [length, _value]);

    useEffect(() => {
      if (value === '') {
        setValues(createPinArray(length ?? 0, value));
      }
    }, [value]);

    return (
      <>
        <Flex id={_id} gap={gap} wrap="nowrap" style={containerStyle}>
          {_value.map((char: string, index: number) => (
            <Input
              variant={variant}
              className={cx(
                {
                  [styles.input]: size === 'middle',
                  [styles['input-large']]: size === 'large',
                  [styles['input-small']]: size === 'small',
                },
                {
                  [styles['input-error']]: status === 'error',
                  [styles['input-warning']]: status === 'warning',
                },
              )}
              style={inputStyle}
              size={size}
              id={`${_id}-${index + 1}`}
              key={`${_id}-${index}`}
              inputMode={inputMode || (pinType === 'number' ? 'numeric' : 'text')}
              onChange={(event) => handleChange(event, index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              onFocus={(event) => handleFocus(event, index)}
              onBlur={handleBlur}
              onPaste={handlePaste}
              type={inputType || (mask ? 'password' : pinType === 'number' ? 'tel' : 'text')}
              status={status}
              disabled={disabled}
              ref={(node) => {
                if (index === 0) {
                  assignRef(ref, node);
                }
                inputsRef.current[index] = node!;
              }}
              autoComplete={oneTimeCode ? 'one-time-code' : 'off'}
              placeholder={focusedIndex === index ? '' : placeholder}
              value={char}
              autoFocus={autoFocus && index === 0}
              readOnly={readOnly}
              {...rest}
            />
          ))}
        </Flex>

        <input type="hidden" name={name} form={form} value={_valueToString} />
      </>
    );
  },
);

export default PinInput;
