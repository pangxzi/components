import {
  DraggablePanel,
  DraggablePanelProps,
  StoryBook,
  useControls,
  useCreateStore,
} from '@datoou/components';
import { Flex } from 'antd';

export default () => {
  const store = useCreateStore();
  const control: DraggablePanelProps | any = useControls(
    {
      defaultExpand: true,
      destroyOnClose: false,
      expandable: true,
      minHeight: {
        step: 1,
        value: 0,
      },
      minWidth: {
        step: 1,
        value: 0,
      },
      mode: {
        options: ['fixed', 'float'],
        value: 'fixed',
      },
      pin: true,
      placement: {
        options: ['left', 'right', 'top', 'bottom'],
        value: 'left',
      },
      showHandlerWhenUnexpand: false,
    },
    { store },
  );

  return (
    <StoryBook levaStore={store} noPadding>
      <Flex
        style={
          ['top', 'bottom'].includes(control.placement)
            ? { flexDirection: 'column', position: 'relative' }
            : { position: 'relative' }
        }
      >
        {['top', 'left'].includes(control.placement) ? (
          <>
            <DraggablePanel {...control}>
              <Flex style={{ padding: 24 }}>Draggable Panel</Flex>
            </DraggablePanel>
            <Flex style={{ flex: 1, padding: 24 }}>Content</Flex>
          </>
        ) : (
          <>
            <Flex style={{ flex: 1, padding: 24 }}>Content</Flex>
            <DraggablePanel {...control}>
              <Flex style={{ padding: 24 }}>Draggable Panel</Flex>
            </DraggablePanel>
          </>
        )}
      </Flex>
    </StoryBook>
  );
};
