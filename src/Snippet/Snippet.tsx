import { Flex } from 'antd';
import { memo } from 'react';

import CopyButton from '@/CopyButton';
import Spotlight from '@/Spotlight';
import { DivProps } from '@/types';

import { useStyles } from './style';

export interface SnippetProps extends DivProps {
  /**
   * @description The content to be displayed inside the Snippet component
   */
  children: string;
  /**
   * @description Whether the Snippet component is copyable or not
   * @default true
   */
  copyable?: boolean;
  /**
   * @description Whether add spotlight background
   * @default false
   */
  spotlight?: boolean;
  /**
   * @description The symbol to be displayed before the content inside the Snippet component
   */
  symbol?: string;
  /**
   * @description The type of the Snippet component
   * @default 'ghost'
   */
  type?: 'ghost' | 'block';
}

const Snippet = memo<SnippetProps>(
  ({ symbol, children, copyable = true, type = 'ghost', spotlight, className, ...rest }) => {
    const { styles, cx } = useStyles(type);

    return (
      <Flex align={'center'} className={cx(styles.container, className)} gap={8} {...rest}>
        {spotlight && <Spotlight />}
        <Flex>{[symbol, children].filter(Boolean).join(' ')}</Flex>
        {copyable && <CopyButton content={children} size={{ blockSize: 24, fontSize: 14 }} />}
      </Flex>
    );
  },
);

export default Snippet;
