import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';
import { RESPONSE } from './src/app/services/http-status.service';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Configurar headers de seguridad incluyendo CSP
  server.use((req, res, next) => {
    // ============================================
    // HEADERS DE SEGURIDAD CRÍTICOS
    // ============================================
    
    // X-Frame-Options - PREVIENE CLICKJACKING
    res.setHeader('X-Frame-Options', 'DENY');
    console.log('🛡️ X-Frame-Options aplicado: DENY');
    
    // Content Security Policy
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.emailjs.com https://unpkg.com https://cdnjs.cloudflare.com https://www.googletagmanager.com https://www.google-analytics.com https://vercel.live",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com",
      "font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com data:",
      "img-src 'self' data: https: blob:",
      "media-src 'self' https:",
      "connect-src 'self' https://api.emailjs.com https://www.google-analytics.com https://vitals.vercel-analytics.com https://vercel.live wss://vercel.live",
      "frame-src 'none'", // TAMBIÉN previene iframes
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self' https://api.emailjs.com",
      "worker-src 'self' blob:",
      "manifest-src 'self'",
      "upgrade-insecure-requests",
      "block-all-mixed-content"
    ].join('; ');

    res.setHeader('Content-Security-Policy', csp);
    
    // Headers de seguridad adicionales
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    
    // Strict Transport Security (HTTPS)
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    
    // Cache Control para resources de seguridad
    if (req.url.includes('security') || req.url.includes('frame')) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    }
    
    next();
  });

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('**', express.static(browserDistFolder, {
    maxAge: '1y',
    index: 'index.html',
  }));

  // Middleware para detectar rutas no válidas y responder con 404
  server.get('**', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;
    
    // Lista de rutas válidas (incluyendo rutas dinámicas)
    const validRoutes = [
      '/',
      '/home',
      '/index',
      '/index.html',
      '/pricing',
      '/blog',
      '/contact',
      '/article', // Para rutas dinámicas como /article/algo
    ];
    
    // Verificar si la ruta es válida o es un archivo estático
    const isValidRoute = validRoutes.some(route => {
      if (route === '/article') {
        return originalUrl.startsWith('/article/');
      }
      return originalUrl === route || originalUrl.startsWith(route + '/');
    });
    
    const isStaticFile = originalUrl.includes('.') && 
                        (originalUrl.includes('.js') || 
                         originalUrl.includes('.css') || 
                         originalUrl.includes('.ico') || 
                         originalUrl.includes('.png') || 
                         originalUrl.includes('.jpg') || 
                         originalUrl.includes('.svg') ||
                         originalUrl.includes('.webp'));

    // Si no es una ruta válida ni un archivo estático, es una página inexistente
    if (!isValidRoute && !isStaticFile && !originalUrl.startsWith('/assets/')) {
      console.log(`🚨 Ruta no encontrada: ${originalUrl} - Enviando 404`);
      res.status(404);
    }

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [
          { provide: APP_BASE_HREF, useValue: baseUrl },
          { provide: RESPONSE, useValue: res }
        ],
      })
      .then((html) => {
        // Si ya se estableció el status 404, asegurar que se mantenga
        if (res.statusCode === 404) {
          console.log(`📤 Enviando respuesta 404 para: ${originalUrl}`);
        }
        res.send(html);
      })
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
