module.exports = {
  extends: ['@vue/eslint-config-typescript', '@vue/eslint-config-prettier'],
  overrides: [
    {
      files: ['*.config.js', '*.config.cjs', '*.config.mjs', '*.config.ts', 'vite.config.js'],
      env: {
        node: true
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        'node/no-missing-require': 'off'
      }
    },
    {
      files: ['*.vue', '*.ts', '*.tsx', '*.js', '*.jsx'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.vue'],
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    }
  ],
  rules: {
    'no-undef': 'off'
  }
}
