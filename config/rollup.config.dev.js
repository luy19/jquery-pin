import merge from 'rollup-merge-config';
import commonConfig from './rollup.config.common.js';
import {
  outputConfig,
  commonResolve,
  check,
  serverPublic,
} from './rollup.config.parts.js';

export default merge(
  commonConfig,
  outputConfig,
  commonResolve(),
  check(),
  serverPublic(),
);
