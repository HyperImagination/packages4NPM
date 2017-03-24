const vue = require('rollup-plugin-vue2');
const css = require('rollup-plugin-css-only');
// const buble = require('rollup-plugin-buble');
// const minify = require('rollup-plugin-minify');
const { name } = require('./package.json');
const toCamelCase = src => src.replace(/-(\w)/g, ($0, $1) => $1.toUpperCase());
const body = {
  entry: 'index.js',
  plugins: [
    vue(),
    css()
    // buble()
  ],
  moduleName: toCamelCase(name),
  sourceMap: true,
  targets: [
    { dest: `../dist/${name}.cjs.js`, format: 'cjs' },
    { dest: `../dist/${name}.umd.js`, format: 'umd' },
    { dest: `../dist/${name}.es.js`, format: 'es' }
  ]
};

export default body;