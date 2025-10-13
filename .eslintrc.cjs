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
    }
  ]
}