module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2020: true,
    },
    extends: [
        'airbnb-base',
    ],
    parserOptions: {
        ecmaVersion: 11,
    },
    rules: {
        'linebreak-style': ['error', 'windows'], // or unix
        indent: ['error', 4], // 4 spances, or 'tab'
        'comma-dangle': 0,
    },
};
