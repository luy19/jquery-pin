import typescript from '@rollup/plugin-typescript';
import { babel } from '@rollup/plugin-babel';
import { pkg } from './rollup.config.parts.js';

export default {
  input: 'src/main.ts',
  output: [
    {
      file: pkg.browser,
      format: 'umd',
      name: 'jQueryPin',
      globals: {
        jquery: '$',
      },
    },
  ],
  external: ['jquery'],
  plugins: [
    typescript({ noForceEmit: true, tsconfig: './src/tsconfig.json' }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
    }),
  ],
};
