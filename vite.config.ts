import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: "/src/*" },
      { find: "@pages", replacement: "/src/pages/index.tsx" },
      { find: "@service", replacement: "/src/service/index.ts" },
      { find: "@modal", replacement: "/src/components/modal/index.tsx" },
      { find: "@components", replacement: "/src/components/components/index.tsx" },
      { find: "@auth-interface", replacement: "/src/types/auth.tsx" },
    ],
  },
})
