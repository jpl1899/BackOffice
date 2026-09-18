import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

/**
 * Minimal Vitest config, igual criterio que tuDeclaracion — solo unit tests de
 * funciones puras por ahora, sin entorno jsdom hasta que exista el primer test
 * de componente.
 */
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
  },
});
