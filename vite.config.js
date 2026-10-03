import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'

function syncImagesPlugin() {
  const sync = () => {
    try {
      const srcDir = path.resolve(__dirname, 'images');
      const destDir = path.resolve(__dirname, 'public/images');
      if (fs.existsSync(srcDir)) {
        if (!fs.existsSync(destDir)) {
          fs.mkdirSync(destDir, { recursive: true });
        }
        const files = fs.readdirSync(srcDir);
        for (const file of files) {
          const srcPath = path.join(srcDir, file);
          const destPath = path.join(destDir, file);
          if (fs.statSync(srcPath).isFile() && !fs.existsSync(destPath)) {
            fs.copyFileSync(srcPath, destPath);
          }
        }
      }
    } catch (e) {
      console.error('Image sync error:', e);
    }
  };

  return {
    name: 'sync-images-plugin',
    configResolved() {
      sync();
    },
    configureServer(server) {
      sync();
      server.middlewares.use((req, res, next) => {
        if (req.url) {
          const match = req.url.match(/^\/?(images\/[^?#]+)/);
          if (match) {
            const relPath = decodeURIComponent(match[1]);
            const srcPath = path.resolve(__dirname, relPath);
            const pubPath = path.resolve(__dirname, 'public', relPath);
            if (!fs.existsSync(pubPath) && fs.existsSync(srcPath)) {
              try {
                fs.mkdirSync(path.dirname(pubPath), { recursive: true });
                fs.copyFileSync(srcPath, pubPath);
              } catch (e) {}
            }
          }
        }
        next();
      });
    }
  };
}

function generateArticlePreviewsPlugin() {
  const generate = () => {
    try {
      const newsDataFile = path.resolve(__dirname, 'src/data/newsData.js');
      if (!fs.existsSync(newsDataFile)) return;
      const content = fs.readFileSync(newsDataFile, 'utf-8');

      const idMatches = [...content.matchAll(/id:\s*(\d+)/g)].map(m => parseInt(m[1]));
      const uniqueIds = [...new Set(idMatches)];

      for (const id of uniqueIds) {
        const regex = new RegExp(`id:\\s*${id},[\\s\\S]*?title:\\s*["'\`]([^"'\`]+)["'\`][\\s\\S]*?image:\\s*["'\`]([^"'\`]+)["'\`][\\s\\S]*?desc:\\s*["'\`]([^"'\`]+)["'\`]`, 'm');
        const match = content.match(regex);
        if (match) {
          const title = match[1];
          const image = match[2];
          const desc = match[3];

          const fullImageUrl = image.startsWith('http') ? image : `https://www.pstermez.uz${image}`;
          const targetDir = path.resolve(__dirname, `public/article/${id}`);
          if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
          }

          const html = `<!doctype html>
<html lang="uz">
<head>
  <meta charset="UTF-8" />
  <title>${title} | Termiz shahridagi Prezident maktabi</title>
  <meta name="description" content="${desc}" />
  
  <!-- Open Graph / Telegram / Facebook -->
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="Termiz shahridagi Prezident maktabi" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${desc}" />
  <meta property="og:image" content="${fullImageUrl}" />
  <meta property="og:url" content="https://www.pstermez.uz/article/${id}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${desc}" />
  <meta name="twitter:image" content="${fullImageUrl}" />

  <meta http-equiv="refresh" content="0; url=/#/article/${id}" />
  <script>window.location.replace("/#/article/${id}");</script>
</head>
<body>
  <p>Sahifaga o'tish: <a href="/#/article/${id}">${title}</a></p>
</body>
</html>
`;
          fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf-8');
        }
      }
    } catch (e) {
      console.error('Error generating article previews:', e);
    }
  };

  return {
    name: 'generate-article-previews',
    configResolved() {
      generate();
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), syncImagesPlugin(), generateArticlePreviewsPlugin()],
  base: './',
})


