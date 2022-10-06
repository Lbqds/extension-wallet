import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  plugins: [react()],
  test: {
    globals: true,
    setupFiles: 'test/setup.ts',
    environment: 'jsdom',
    testTimeout: 50 * 60 * 1000,
    exclude: ['**/node_modules/**', '**/dist/**', '**/.{idea,git,cache,output,temp}/**'],
    coverage: {
      exclude: ['**/*.mock.ts', '**/setup.ts']
    }
  }
})
