module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  overrides: [
  ],
  parserOptions: {
    parser: 'espree',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
};
