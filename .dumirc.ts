import { defineConfig } from 'dumi';
import { homepage } from './package.json';

export default defineConfig({
  themeConfig: {
    name: '@datoou/components',
    github: homepage,
  },
  html2sketch: {},
  extraBabelPlugins: ['antd-style'],
});
