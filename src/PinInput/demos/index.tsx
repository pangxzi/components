import {
  PinInput,
  StoryBook,
  useControls,
  useCreateStore,
  type PinInputProps,
} from '@datoou/components';

export default () => {
  const store = useCreateStore();
  const control: PinInputProps | any = useControls(
    {
      size: {
        options: ['small', 'middle', 'large'],
        value: 'middle',
      },
      variant: {
        options: ['outlined', 'borderless', 'filled'],
        value: 'outlined',
      },
      status: {
        options: ['warning', 'error', ''],
        value: '',
      },
      gap: {
        options: ['small', 'middle', 'large'],
        value: 'small',
      },
      pinType: {
        options: ['alphanumeric', 'number'],
        value: 'alphanumeric',
      },
      length: {
        max: 10,
        min: 2,
        step: 1,
        value: 4,
      },
      placeholder: '○',
      mask: false,
      disabled: false,
    },
    { store },
  );

  return (
    <StoryBook levaStore={store}>
      <PinInput {...control} />
    </StoryBook>
  );
};
