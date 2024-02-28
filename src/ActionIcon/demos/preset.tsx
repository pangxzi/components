import { CollapseAction, DeleteAction, EditAction, HandleAction } from '@datoou/components';
import { StoryBook, useCreateStore } from '@lobehub/ui';
import { Space } from 'antd';

export default () => {
  const store = useCreateStore();
  return (
    <StoryBook levaStore={store}>
      <Space>
        <DeleteAction title="删除按钮" />
        <EditAction title="编辑按钮" />
        <HandleAction title="拖动按钮" />
        <CollapseAction title="收起按钮" />
      </Space>
    </StoryBook>
  );
};
