import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    globals: true,
    passWithNoTests: true,
    environment: 'node',
    dir: './src',
    reporters: ['verbose'],
    coverage: {
      provider: 'c8',
      reportsDirectory: './tests/coverage',
    },
  },
});
