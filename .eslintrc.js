module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'standard'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    semi: [2, 'always'],
    'no-useless-return': 0,
    'no-unused-vars': 0,
    'space-before-function-paren': [
      'error',
      { anonymous: 'always', named: 'never' }
    ]
  }
};
