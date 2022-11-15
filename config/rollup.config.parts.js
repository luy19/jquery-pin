
import { readFileSync } from 'node:fs';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import del from 'rollup-plugin-delete';
import eslint from 'rollup-plugin-eslint2';
import { liveServer } from 'rollup-plugin-live-server';
import staticFiles from 'rollup-plugin-static-files';
import terser from '@rollup/plugin-terser';

export const pkg = JSON.parse(
  readFileSync(new URL('../package.json', import.meta.url)),
);

export const outputConfig = {
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'es',
    },
  ],
};

export const commonResolve = () => ({
  plugins: [
    commonjs({
      include: 'node_modules/**',
      extensions: ['.js'],
      sourceMap: false,
    }),
    nodeResolve({
      moduleDirectories: ['node_modules'],
    }),
  ],
});

export const deleteDist = () => ({
  plugins: [del({ targets: 'dist/*' })],
});

export const check = () => ({
  plugins: [
    eslint({
      fix: true,
      throwOnError: true,
      throwOnWarning: true,
    }),
  ],
});

export const serverPublic = () => ({
  plugins: [
    liveServer({
      port: 8001,
      host: '0.0.0.0',
      root: 'public',
      file: 'index.html',
      mount: [['/', './dist']],
      open: false,
      wait: 500,
    }),
  ],
});

export const staticPublic = () => ({
  plugins: [
    staticFiles({
      include: ['./public'],
    }),
  ],
});

export const minify = () => ({
  plugins: [terser()],
});
