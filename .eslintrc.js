module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "eslint-config-airbnb-base",
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
  ],
  rules: {
    'import/extensions': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error', { ignoreTypeReferences: true }],
    'import/prefer-default-export': 'off',
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', './src'],
      },
    },
  },
  parserOptions: {
    project: './tsconfig.json',
  },
}