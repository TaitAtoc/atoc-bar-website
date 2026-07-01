import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const robotsContent = env.VITE_ROBOTS_NOINDEX === 'true'
    ? 'noindex,nofollow'
    : 'index,follow'

  return {
    plugins: [react()],
    base: mode === 'production' ? '/wp-content/themes/atoc-bar-v2/' : '/',
    define: {
      __ATOC_ROBOTS_CONTENT__: JSON.stringify(robotsContent),
    },
    build: {
      manifest: true,
    },
  }
})
