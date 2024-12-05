import eslintPluginPrettier from 'eslint-plugin-prettier';

export default [
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    ignores: [
      '.history',
      '.history/**',
      '**/.history/**',
      './.history/**',
      'node_modules/**',
      'dist/**',
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      'no-unused-vars': 'warn',
      eqeqeq: 'error',
      'prettier/prettier': 'error',
    },
  },
];
