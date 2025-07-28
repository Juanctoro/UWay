import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()
  ],
  server: {
    proxy: {
      '/nominatim': {
        target: 'https://nominatim.openstreetmap.org',
        changeOrigin: true,
        secure: true,        // deja true si confías en el certificado
        rewrite: (path) => path.replace(/^\/nominatim/, ''),
        configure: (proxy, options) => {
          // Se dispara justo antes de enviar la petición a Nominatim
          proxy.on('proxyReq', (proxyReq, req, res) => {
            // OBLIGATORIO: un User‑Agent que describa tu app
            proxyReq.setHeader(
              'User-Agent',
              'Ugüee-App/1.0 (tu.correo@dominio.com)'
            );
            // OPCIONAL pero recomendado: Referer o From
            proxyReq.setHeader(
              'Referer',
              'http://localhost:5173/'
            );
          });
        }
      }
    }
  }
})
