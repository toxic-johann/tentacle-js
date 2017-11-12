const { version, name, author, license, dependencies } = require('../package.json');
const banner = `
/**
 * ${name} v${version}
 * (c) 2017 ${author}
 * Released under ${license}
 */
`;
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import replace from 'rollup-plugin-replace';
import typescriptPlugin from 'rollup-plugin-typescript';
import typescript from 'typescript';
import { camelize } from 'toxic-utils';
const externalRegExp = new RegExp(Object.keys(dependencies).join('|'));
export default {
  input: 'src/index.ts',
  output: {
    format: 'umd',
    file: 'lib/index.dev.js',
  },
  name: camelize(name, true),
  banner,
  external(id) {
    return externalRegExp.test(id);
  },
  plugins: [
    resolve({
      customResolveOptions: {
        moduleDirectory: [ 'src', 'node_modules' ],
      },
    }),
    commonjs(),
    replace({
      'process.env.PLAYER_VERSION': `'${version}'`,
      'process.env.NODE_ENV': '"development"',
    }),
    serve(),
    livereload(),
    typescriptPlugin({ typescript }),
  ],
}
