/**
 * title: Basic
 */
import { SmileOutlined } from '@ant-design/icons';
import { ActionIcon } from '@datoou/components';

export default () => (
  <ActionIcon
    title={'功能按钮的说明'}
    icon={<SmileOutlined />}
    onClick={() => {
      alert('触发动作');
    }}
  />
);
