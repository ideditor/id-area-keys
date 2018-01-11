import json from 'rollup-plugin-json';

export default {
    input: 'index.js',
    output: {
        name: 'areaKeys',
        file: 'index.umd.js',
        format: 'umd',
    },
    plugins: [
        json()
    ]
};
