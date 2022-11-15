import merge from 'rollup-merge-config';
import commonConfig from './rollup.config.common.js';
import { outputConfig, minify, deleteDist } from './rollup.config.parts.js';

export default merge(commonConfig, outputConfig, minify(), deleteDist());
