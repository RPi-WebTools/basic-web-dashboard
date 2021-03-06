module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    parserOptions: {
        parser: 'babel-eslint'
    },
    rules: {
        'no-console': [process.env.NODE_ENV === 'production' ? 'error' : 'off', {
            allow: ['error']
        }],
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'vue/script-indent': ['error', 4, {
            switchCase: 1
        }],
        indent: 'off'
    }
}
