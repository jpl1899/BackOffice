import antfu from '@antfu/eslint-config';

export default antfu({
  typescript: {
    tsconfigPath: 'tsconfig.json',
  },

  lessOpinionated: true,

  ignores: [
    'node_modules',
    'dist',
    '.next',
    '**/*.md',
    // Supabase Database types written by `bun run supabase:types` — large
    // machine-generated snake_case file, same rationale as tuDeclaracion.
    'src/types/supabase.ts',
    'supabase/functions/**',
    'supabase/config.toml',
  ],

  rules: {
    'no-console': 'off',
    'ts/explicit-function-return-type': 'off',
    'ts/explicit-module-boundary-types': 'off',
    'ts/no-explicit-any': 'warn',
    'ts/strict-boolean-expressions': 'off',
    'node/prefer-global/process': 'off',
    'node/prefer-global/buffer': 'off',
    'style/semi': ['error', 'always'],
    'style/quotes': ['error', 'single'],
    'style/comma-dangle': ['error', 'always-multiline'],
    'unused-imports/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
  },
});
