import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { babel } from '@rollup/plugin-babel';
import eslint from 'rollup-plugin-eslint2';
import { liveServer } from 'rollup-plugin-live-server';
import pkg from '../package.json';

export default {
  input: './src/main.ts',
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
    nodeResolve({
      moduleDirectories: ['node_modules'],
    }),
    commonjs({
      include: 'node_modules/**',
      extensions: ['.js'],
      sourceMap: false,
    }),
    eslint({
      fix: true,
      throwOnError: true,
      throwOnWarning: true,
    }),
    typescript({ noForceEmit: true, tsconfig: './src/tsconfig.json' }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
    }),
    liveServer({
      port: 8001,
      host: '0.0.0.0',
      root: 'public',
      file: 'index.html',
      mount: [
        ['/', './dist'],
      ],
      open: false,
      wait: 500,
    }),
  ],
};
