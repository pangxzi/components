import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  esbuild: {
    jsxInject: "import React from 'react'",
  },
  test: {
    setupFiles: './tests/test-setup.ts',
    environment: 'jsdom',
    globals: true,
    alias: {
      '@datoou/components': path.join(__dirname, './src'),
      '@': path.join(__dirname, './src'),
    },
    coverage: {
      reporter: ['text', 'text-summary', 'json', 'lcov'],
    },
  },
});
