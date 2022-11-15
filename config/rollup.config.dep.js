import merge from 'rollup-merge-config';
import commonConfig from './rollup.config.common.js';
import { minify, deleteDist, staticPublic } from './rollup.config.parts.js';

export default merge(commonConfig, minify(), deleteDist(), staticPublic());
