import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CspService {
  private nonces: Map<string, string> = new Map();

  constructor(@Inject(DOCUMENT) private document: Document) {}

  /**
   * Genera un nonce único para scripts inline seguros
   */
  generateNonce(): string {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    const nonce = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    return nonce;
  }

  /**
   * Configura CSP para el entorno actual
   */
  setupCSP(): void {
    // Solo configurar en el navegador
    if (typeof window !== 'undefined') {
      this.addCSPMetaTag();
      this.setupReportingEndpoint();
    }
  }

  /**
   * Agrega meta tag CSP dinámicamente
   */
  private addCSPMetaTag(): void {
    // Remover CSP existente si existe
    const existingCSP = this.document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    if (existingCSP) {
      existingCSP.remove();
    }

    // Crear nueva política CSP
    const cspMeta = this.document.createElement('meta');
    cspMeta.setAttribute('http-equiv', 'Content-Security-Policy');
    cspMeta.setAttribute('content', this.buildCSPPolicy());
    this.document.head.appendChild(cspMeta);
  }

  /**
   * Construye la política CSP completa
   */
  private buildCSPPolicy(): string {
    const policies = {
      // Fuentes por defecto - solo el mismo origen
      'default-src': ["'self'"],
      
      // Scripts - permite Angular, EmailJS y herramientas de desarrollo
      'script-src': [
        "'self'",
        "'unsafe-inline'", // Necesario para Angular en desarrollo
        "'unsafe-eval'",   // Necesario para Angular en desarrollo
        "https://cdn.emailjs.com",
        "https://unpkg.com",           // Para Flowbite
        "https://cdnjs.cloudflare.com", // Para Font Awesome
        "https://www.googletagmanager.com",
        "https://www.google-analytics.com",
        "https://vercel.live"  // Para Vercel analytics
      ],
      
      // Estilos - permite inline styles y Google Fonts
      'style-src': [
        "'self'",
        "'unsafe-inline'", // Necesario para Angular component styles
        "https://fonts.googleapis.com",
        "https://cdnjs.cloudflare.com" // Para Font Awesome CSS
      ],
      
      // Fuentes - permite Google Fonts y data URIs
      'font-src': [
        "'self'",
        "https://fonts.gstatic.com",
        "https://cdnjs.cloudflare.com", // Para Font Awesome fonts
        "data:"
      ],
      
      // Imágenes - permite todas las fuentes HTTPS y data URIs
      'img-src': [
        "'self'",
        "data:",
        "https:",
        "blob:"
      ],
      
      // Media - permite HTTPS
      'media-src': [
        "'self'",
        "https:"
      ],
      
      // Conexiones - APIs permitidas
      'connect-src': [
        "'self'",
        "https://api.emailjs.com",
        "https://www.google-analytics.com",
        "https://vitals.vercel-analytics.com",
        "https://vercel.live",
        "wss://vercel.live" // WebSocket para Vercel
      ],
      
      // Marcos - ninguno permitido
      'frame-src': ["'none'"],
      
      // Objetos - ninguno permitido
      'object-src': ["'none'"],
      
      // Base URI - solo el mismo origen
      'base-uri': ["'self'"],
      
      // Acciones de formulario - solo EmailJS y mismo origen
      'form-action': [
        "'self'",
        "https://api.emailjs.com"
      ],
      
      // Fuentes de trabajo (workers)
      'worker-src': [
        "'self'",
        "blob:"
      ],
      
      // Manifestos
      'manifest-src': ["'self'"]
    };

    // Convertir a string de política CSP
    const policyParts = Object.entries(policies).map(([directive, sources]) => 
      `${directive} ${sources.join(' ')}`
    );

    // Agregar directivas adicionales
    policyParts.push('upgrade-insecure-requests');
    policyParts.push('block-all-mixed-content');

    return policyParts.join('; ');
  }

  /**
   * Configura endpoint de reportes CSP (opcional)
   */
  private setupReportingEndpoint(): void {
    // Puedes configurar un endpoint para recibir reportes de violaciones CSP
    // Ejemplo: report-uri /csp-report-endpoint
  }

  /**
   * Verifica si el navegador soporta CSP
   */
  isCSPSupported(): boolean {
    return 'SecurityPolicyViolationEvent' in window;
  }

  /**
   * Configura listener para violaciones CSP (desarrollo/debug)
   */
  setupCSPViolationListener(): void {
    if (this.isCSPSupported()) {
      document.addEventListener('securitypolicyviolation', (event) => {
        console.group('🚨 CSP Violation Detected');
        console.error('Blocked URI:', event.blockedURI);
        console.error('Violated Directive:', event.violatedDirective);
        console.error('Original Policy:', event.originalPolicy);
        console.error('Source File:', event.sourceFile);
        console.error('Line Number:', event.lineNumber);
        console.groupEnd();
      });
    }
  }

  /**
   * Método para desarrolladores - relaja CSP en desarrollo
   */
  setupDevelopmentCSP(): void {
    if (typeof window !== 'undefined' && this.isDevelopment()) {
      console.warn('🔶 Running in Development Mode - CSP is relaxed for better DX');
      
      // CSP más permisivo para desarrollo
      const devCSP = this.document.createElement('meta');
      devCSP.setAttribute('http-equiv', 'Content-Security-Policy');
      devCSP.setAttribute('content', 
        "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: https: wss: ws:; " +
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https: http: localhost:*; " +
        "style-src 'self' 'unsafe-inline' https: http:; " +
        "img-src 'self' data: blob: https: http:; " +
        "connect-src 'self' https: http: ws: wss: localhost:*"
      );
      
      this.document.head.appendChild(devCSP);
    }
  }

  /**
   * Detecta si estamos en modo desarrollo
   */
  private isDevelopment(): boolean {
    return !this.document.location.hostname.includes('vercel.app') &&
           !this.document.location.hostname.includes('kendraphotography.com') &&
           (this.document.location.hostname === 'localhost' || 
            this.document.location.hostname.startsWith('192.168.') ||
            this.document.location.hostname === '127.0.0.1');
  }
}