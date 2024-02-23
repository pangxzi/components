import { CollapseAction, DeleteAction, EditAction, HandleAction } from '@datoou/components';
import { Space } from 'antd';

export default () => (
  <Space>
    <DeleteAction title="删除按钮" />
    <EditAction title="编辑按钮" />
    <HandleAction title="拖动按钮" />
    <CollapseAction title="收起按钮" />
  </Space>
);
