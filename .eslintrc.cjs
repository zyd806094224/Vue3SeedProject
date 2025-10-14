module.exports = {
  extends: [
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier'
  ],
  overrides: [
    {
      files: ['*.config.js', '*.config.cjs', '*.config.mjs', '*.config.ts', 'vite.config.ts'],
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
      // 添加Vue文件的配置
      files: ['*.vue','*.ts', '*.tsx'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.vue'],
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    }
  ]
}
