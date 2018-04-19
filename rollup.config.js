import json from 'rollup-plugin-json';

export default {
    input: 'index.mjs',
    output: {
        file: 'index.js',
        format: 'umd',
        indent: false,
        name: 'areaKeys'
    },
    plugins: [
        json()
    ]
};
