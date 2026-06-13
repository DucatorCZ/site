import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
<<<<<<< HEAD
  base: '/site/',
  plugins: [react()],
})
=======
  plugins: [react(), cloudflare()],
})
>>>>>>> e0e58cf0669f42d64e0913c512e3162919fa64ca
