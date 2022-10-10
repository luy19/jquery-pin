import typescript from '@rollup/plugin-typescript';
import { babel } from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import del from 'rollup-plugin-delete';
import pkg from '../package.json';

export default {
  input: 'src/main.ts',
  output: [
    {
      file: pkg.browser,
      format: 'umd',
      name: 'JQueryPin',
      globals: {
        jquery: '$',
      },
    },
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'es',
    },
  ],
  external: ['jquery'],
  plugins: [
    typescript({ noForceEmit: true, tsconfig: './src/tsconfig.json' }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
    }),
    terser(),
    del({ targets: 'dist/*' }),
  ],
};
