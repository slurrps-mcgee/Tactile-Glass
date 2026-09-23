import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: 'docs',
  appType: 'mpa',
  server: {
    port: 8080,
    host: '127.0.0.1',
    open: '/docs.html',
    fs: { allow: [projectRoot] },
  },
  plugins: [
    {
      name: 'reload-docs',
      configureServer(server) {
        const reload = () => {
          server.ws.send({ type: 'full-reload', path: '*' });
        };

        server.watcher.add(path.join(projectRoot, 'src/scss'));
        server.watcher.on('change', (file) => {
          if (/\.(css|html|js|scss)$/.test(file)) reload();
        });
      },
      handleHotUpdate({ server }) {
        server.ws.send({ type: 'full-reload', path: '*' });
        return [];
      },
    },
  ],
});
