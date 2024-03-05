import { FloatPanel, FluentEmoji } from '@datoou/components';
import { Flex } from 'antd';

export default () => {
  return (
    <div
      style={{
        height: 400,
        position: 'relative',
      }}
    >
      <FloatPanel
        defaultPosition={{ x: 80, y: 30 }}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Flex vertical align="center" gap={8}>
          <FluentEmoji size={128} emoji="😾" type={'anim'} />
          <h1>Move Me!</h1>
        </Flex>
      </FloatPanel>
    </div>
  );
};
