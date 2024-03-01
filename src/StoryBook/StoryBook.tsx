import { Flex } from 'antd';
import { useResponsive } from 'antd-style';
import { LevaPanel } from 'leva';
import { memo } from 'react';

import { DivProps } from '@/types';

import { DraggablePanel } from '@datoou/components';
import { useStyles } from './style';

export interface StoryBookProps extends DivProps {
  /**
   * @description The Leva store instance to be used by the component
   * @type levaStore
   */
  levaStore: any;
  /**
   * @description If use padding around component
   */
  noPadding?: boolean;
}

export const StoryBook = memo<StoryBookProps>(
  ({ levaStore, noPadding, className, children, ...rest }) => {
    const { mobile } = useResponsive();
    const { styles, cx } = useStyles(Boolean(noPadding));

    return (
      <Flex
        align={'stretch'}
        className={cx(styles.editor, className)}
        // horizontal={!mobile}
        vertical={mobile}
        justify={'stretch'}
        {...rest}
      >
        <Flex vertical align={'center'} className={styles.left} flex={1} justify={'center'}>
          {children}
        </Flex>
        <DraggablePanel
          className={styles.right}
          minWidth={280}
          placement={mobile ? 'bottom' : 'right'}
        >
          <div className={styles.leva}>
            <LevaPanel fill flat store={levaStore} titleBar={false} />{' '}
          </div>
        </DraggablePanel>
      </Flex>
    );
  },
);

export default StoryBook;
