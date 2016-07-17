import json from 'rollup-plugin-json';

export default {
    dest: 'index.umd.js',
    moduleName: 'areaKeys',
    entry: 'index.js',
    format: 'umd',
    plugins: [
        json()
    ]
};
