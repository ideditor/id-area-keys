import json from 'rollup-plugin-json';

export default {
    input: 'index.mjs',
    output: {
        name: 'areaKeys',
        file: 'index.js',
        format: 'umd'
    },
    plugins: [
        json()
    ]
};
