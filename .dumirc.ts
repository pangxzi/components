import { defineConfig } from 'dumi';
import { resolve } from 'path';
//@ts-ignore
import { description, homepage, name } from './package.json';

export default defineConfig({
  title: 'Datoou Components',
  themeConfig: {
    logo: '😺',
    actions: [
      {
        icon: 'Github',
        link: homepage,
        openExternal: true,
        text: 'Github',
      },
      {
        link: '/guide',
        text: 'Get Started',
        type: 'primary',
      },
    ],
    alias: {
      '@': resolve(__dirname, '../src'),
      'dumi-theme-lobehub': resolve(__dirname, '../src'),
    },
    apiHeader: {
      docUrl: `{github}/tree/master/src/{atomId}/index.md`,
      match: ['/components'],
      pkg: name,
      sourceUrl: `{github}/tree/master/src/{atomId}/index.tsx`,
      type: 'doc',
    },
    description,
    footer: 'Copyright © 2024',
    footerConfig: {
      bottom: 'Made with 😺 by Datoou',
      columns: [],
    },
    giscus: {
      category: 'Q&A',
      categoryId: 'DIC_kwDOLW0tN84Cdm3i',
      repo: 'datoou/components',
      repoId: 'R_kgDOLW0tNw',
    },
    name: 'components',
    socialLinks: {
      github: homepage,
    },
  },
  logo: '😺',
  favicons: ['/favicon.svg'],
  apiParser: {},
  resolve: {
    entryFile: './src/index.ts',
  },
  html2sketch: {},
  extraBabelPlugins: ['antd-style'],
  styles: [
    `html, body { background: transparent;  }

  @media (prefers-color-scheme: dark) {
    html, body { background: #000; }
  }`,
  ],
});
