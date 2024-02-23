import { defineConfig } from 'dumi';
//@ts-ignore
import { homepage } from './package.json';

export default defineConfig({
  themeConfig: {
    name: '@datoou/components',
    socialLinks: {
      github: homepage,
    },
  },
  html2sketch: {},
  extraBabelPlugins: ['antd-style'],
});
