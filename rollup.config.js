import json from 'rollup-plugin-json';

export default {
    input: 'index.js',
    name: 'areaKeys',
    output: {
        file: 'index.umd.js',
        format: 'umd',
    },
    plugins: [
        json()
    ]
};
