import { defineConfig } from 'dumi';
//@ts-ignore
import { homepage } from './package.json';

export default defineConfig({
  themeConfig: {
    name: '@datoou/components',
    socialLinks: {
      github: homepage,
    },
    hero: {
      title: 'ProEditor',
      description: '🌟 通用编辑器 UI 框架',
      actions: [
        {
          text: '快速开始 →',
          link: '/guide/intro',
        },
        {
          text: 'Github',
          link: 'https://github.com/ant-design/pro-editor',
        },
      ],
    },
  },
  html2sketch: {},
  extraBabelPlugins: ['antd-style'],
});
