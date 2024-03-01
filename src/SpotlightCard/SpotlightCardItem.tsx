import { memo } from 'react';

import { DivProps } from '@/types';

import { Flex } from 'antd';
import { useStyles } from './style';

export interface SpotlightCardItemProps extends DivProps {
  borderRadius: number;
  size: number;
}

const SpotlightCardItem = memo<SpotlightCardItemProps>(
  ({ children, className, style, borderRadius, size, ...rest }) => {
    const { styles, cx } = useStyles({ borderRadius, size });

    return (
      <Flex
        vertical
        className={cx(styles.itemContainer, className)}
        style={{ borderRadius, ...style }}
        {...rest}
      >
        <Flex className={styles.content}>{children}</Flex>
      </Flex>
    );
  },
);

export default SpotlightCardItem;
