import { SpotlightCard } from '@datoou/components';
import { Avatar, Flex } from 'antd';

import data from './data';

const render = (item: any) => (
  <Flex align={'flex-start'} gap={8} style={{ padding: 16 }}>
    <Avatar size={24} src={item.favicon} style={{ flex: 'none' }} />
    <Flex vertical>
      <div style={{ fontSize: 15, fontWeight: 600 }}>{item.title}</div>
      <div style={{ opacity: 0.6 }}>{item.content}</div>
    </Flex>
  </Flex>
);

export default () => {
  return <SpotlightCard items={data} renderItem={render} />;
};
