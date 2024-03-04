import { Features, FeaturesProps, Snippet } from '@datoou/components';
import { Flex } from 'antd';
import { Palette, Smartphone, Zap } from 'lucide-react';

const items: FeaturesProps['items'] = [
  {
    description: '基于 antd v5，默认提供浅色和深色主题的自定义算法，提供美观且用户友好的选项。',
    icon: Palette,
    title: '主题化',
  },
  {
    description: '该主题包采用现代设计技术，使文档更直观、易读和用户友好。',
    icon: Zap,
    title: '现代',
  },
  {
    description: '专为移动设备设计。基于 CSSinJS 的灵活样式解决方案，轻松实现多种布局选项。',
    icon: Smartphone,
    title: '移动适配',
  },
];

export default () => {
  return (
    <Flex gap={32} vertical>
      <Flex vertical align="center">
        <h2 style={{ fontSize: 20 }}>To install @datoou/components, run the following command:</h2>
        <Snippet language={'bash'}>{'$ pnpm install @datoou/components -S'}</Snippet>
      </Flex>
      <Features items={items} />
    </Flex>
  );
};
