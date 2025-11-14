import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SecurityHeadersService {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  /**
   * Configura todos los headers de seguridad
   */
  setupSecurityHeaders(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setFrameOptions();
      this.setContentTypeOptions();
      this.setXssProtection();
      this.setReferrerPolicy();
      this.setPermissionsPolicy();
      this.verifySecurityHeaders();
    }
  }

  /**
   * Configura X-Frame-Options para prevenir clickjacking
   */
  private setFrameOptions(): void {
    // Verificar si ya existe
    let frameOptionsTag = this.document.querySelector('meta[http-equiv="X-Frame-Options"]') as HTMLMetaElement;
    
    if (!frameOptionsTag) {
      frameOptionsTag = this.document.createElement('meta');
      frameOptionsTag.setAttribute('http-equiv', 'X-Frame-Options');
      this.document.head.appendChild(frameOptionsTag);
    }
    
    frameOptionsTag.setAttribute('content', 'DENY');
    
    console.info('🛡️ X-Frame-Options configurado: DENY (previene clickjacking)');
  }

  /**
   * Configura X-Content-Type-Options
   */
  private setContentTypeOptions(): void {
    let contentTypeTag = this.document.querySelector('meta[http-equiv="X-Content-Type-Options"]') as HTMLMetaElement;
    
    if (!contentTypeTag) {
      contentTypeTag = this.document.createElement('meta');
      contentTypeTag.setAttribute('http-equiv', 'X-Content-Type-Options');
      this.document.head.appendChild(contentTypeTag);
    }
    
    contentTypeTag.setAttribute('content', 'nosniff');
  }

  /**
   * Configura X-XSS-Protection
   */
  private setXssProtection(): void {
    let xssTag = this.document.querySelector('meta[http-equiv="X-XSS-Protection"]') as HTMLMetaElement;
    
    if (!xssTag) {
      xssTag = this.document.createElement('meta');
      xssTag.setAttribute('http-equiv', 'X-XSS-Protection');
      this.document.head.appendChild(xssTag);
    }
    
    xssTag.setAttribute('content', '1; mode=block');
  }

  /**
   * Configura Referrer-Policy
   */
  private setReferrerPolicy(): void {
    let referrerTag = this.document.querySelector('meta[http-equiv="Referrer-Policy"]') as HTMLMetaElement;
    
    if (!referrerTag) {
      referrerTag = this.document.createElement('meta');
      referrerTag.setAttribute('http-equiv', 'Referrer-Policy');
      this.document.head.appendChild(referrerTag);
    }
    
    referrerTag.setAttribute('content', 'strict-origin-when-cross-origin');
  }

  /**
   * Configura Permissions-Policy
   */
  private setPermissionsPolicy(): void {
    let permissionsTag = this.document.querySelector('meta[http-equiv="Permissions-Policy"]') as HTMLMetaElement;
    
    if (!permissionsTag) {
      permissionsTag = this.document.createElement('meta');
      permissionsTag.setAttribute('http-equiv', 'Permissions-Policy');
      this.document.head.appendChild(permissionsTag);
    }
    
    permissionsTag.setAttribute('content', 'camera=(), microphone=(), geolocation=()');
  }

  /**
   * Verifica que los headers de seguridad estén configurados correctamente
   */
  private verifySecurityHeaders(): void {
    const securityChecks = {
      'X-Frame-Options': this.document.querySelector('meta[http-equiv="X-Frame-Options"]'),
      'X-Content-Type-Options': this.document.querySelector('meta[http-equiv="X-Content-Type-Options"]'),
      'X-XSS-Protection': this.document.querySelector('meta[http-equiv="X-XSS-Protection"]'),
      'Referrer-Policy': this.document.querySelector('meta[http-equiv="Referrer-Policy"]'),
      'Content-Security-Policy': this.document.querySelector('meta[http-equiv="Content-Security-Policy"]')
    };

    console.group('🔒 Verificación de Headers de Seguridad');
    
    Object.entries(securityChecks).forEach(([header, element]) => {
      if (element) {
        const content = element.getAttribute('content');
        console.info(`✅ ${header}: ${content}`);
      } else {
        console.warn(`❌ ${header}: NO CONFIGURADO`);
      }
    });
    
    console.groupEnd();
  }

  /**
   * Prueba de clickjacking - detecta si la página está en un frame
   */
  detectClickjackingAttempt(): void {
    // Solo ejecutar en producción o cuando sea realmente necesario
    if (!isPlatformBrowser(this.platformId)) return;
    
    // Verificar si la detección está deshabilitada
    if (this.isClickjackingDetectionDisabled()) {
      console.info('🔧 Detección de clickjacking deshabilitada por el usuario');
      return;
    }
    
    try {
      // Verificación más robusta
      const isInFrame = window.self !== window.top;
      const isLocalhost = window.location.hostname === 'localhost' || 
                         window.location.hostname === '127.0.0.1';
      const isDevelopment = window.location.port === '4200' || 
                           window.location.port === '4000';
      
      // En desarrollo local, no mostrar advertencia
      if (isLocalhost && isDevelopment) {
        console.info('🔧 Modo desarrollo detectado - protección clickjacking deshabilitada');
        return;
      }
      
      // Verificación adicional para frames legítimos
      if (isInFrame) {
        try {
          // Intentar acceder al dominio del frame padre
          const parentOrigin = window.parent.location.origin;
          const currentOrigin = window.location.origin;
          
          // Si es el mismo dominio, probablemente es legítimo
          if (parentOrigin === currentOrigin) {
            console.info('✅ Frame del mismo dominio detectado - permitido');
            return;
          }
        } catch (crossOriginError) {
          // Error de cross-origin indica frame de diferente dominio (sospechoso)
          console.warn('🚨 INTENTO DE CLICKJACKING DETECTADO');
          console.warn('Frame de diferente origen detectado');
          this.showClickjackingWarning();
          return;
        }
        
        // Si llegamos aquí, es un frame de diferente dominio
        console.warn('🚨 INTENTO DE CLICKJACKING DETECTADO');
        console.warn('La página está siendo cargada dentro de un frame/iframe');
        this.showClickjackingWarning();
        return;
      }
      
      console.info('✅ No se detectaron intentos de clickjacking');
    } catch (error) {
      // Solo mostrar advertencia si no estamos en desarrollo
      const isLocalhost = window.location.hostname === 'localhost';
      if (!isLocalhost) {
        console.warn('🚨 POSIBLE CLICKJACKING: No se puede acceder al frame padre');
        this.showClickjackingWarning();
      }
    }
  }

  /**
   * Muestra advertencia de clickjacking
   */
  private showClickjackingWarning(): void {
    // Verificar si ya existe la advertencia
    if (this.document.getElementById('clickjacking-warning')) {
      return;
    }
    
    // Crear overlay de advertencia
    const overlay = this.document.createElement('div');
    overlay.id = 'clickjacking-warning';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 0, 0, 0.9);
      color: white;
      z-index: 999999;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-family: Arial, sans-serif;
      font-size: 20px;
      text-align: center;
      padding: 20px;
    `;
    
    overlay.innerHTML = `
      <div style="background: white; color: #333; padding: 30px; border-radius: 10px; max-width: 500px;">
        <h1 style="color: #d32f2f; margin-top: 0;">⚠️ ADVERTENCIA DE SEGURIDAD</h1>
        <p>Esta página está siendo mostrada dentro de un frame.</p>
        <p>Esto podría ser un intento de clickjacking.</p>
        <div style="margin-top: 20px;">
          <button id="open-secure" 
                  style="padding: 10px 20px; font-size: 16px; margin: 5px; background: #4caf50; color: white; border: none; border-radius: 5px; cursor: pointer;">
            Abrir en ventana segura
          </button>
          <button id="dismiss-warning" 
                  style="padding: 10px 20px; font-size: 16px; margin: 5px; background: #757575; color: white; border: none; border-radius: 5px; cursor: pointer;">
            Continuar (no recomendado)
          </button>
        </div>
        <p style="font-size: 12px; margin-top: 15px; color: #666;">
          Si confías en esta página, puedes continuar. Solo hazlo si sabes que es seguro.
        </p>
      </div>
    `;
    
    this.document.body.appendChild(overlay);
    
    // Agregar event listeners
    const openSecureBtn = this.document.getElementById('open-secure');
    const dismissBtn = this.document.getElementById('dismiss-warning');
    
    if (openSecureBtn) {
      openSecureBtn.addEventListener('click', () => {
        try {
          window.open(window.location.href, '_top');
        } catch (error) {
          window.top!.location.href = window.location.href;
        }
      });
    }
    
    if (dismissBtn) {
      dismissBtn.addEventListener('click', () => {
        overlay.remove();
        console.warn('⚠️ Usuario eligió continuar a pesar de la advertencia de clickjacking');
      });
    }
  }

  /**
   * Configura protección adicional contra iframe embedding
   */
  setupIframeProtection(): void {
    // JavaScript adicional para prevenir iframe embedding
    const script = this.document.createElement('script');
    script.textContent = `
      // Prevenir que la página sea cargada en un iframe
      if (window.top !== window.self) {
        // Romper el frame redirigiendo al padre
        window.top.location.replace(window.location.href);
      }
      
      // Detectar cambios en el DOM que podrían indicar manipulación
      const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            // Verificar si se han agregado iframes sospechosos
            mutation.addedNodes.forEach(function(node) {
              if (node.nodeName === 'IFRAME') {
                console.warn('🚨 Iframe detectado:', node);
              }
            });
          }
        });
      });
      
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    `;
    
    this.document.head.appendChild(script);
    console.info('🛡️ Protección adicional contra iframes configurada');
  }

  /**
   * Método para testing - simula diferentes configuraciones de frame options
   */
  testFrameOptions(option: 'DENY' | 'SAMEORIGIN' | 'ALLOW-FROM'): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const frameOptionsTag = this.document.querySelector('meta[http-equiv="X-Frame-Options"]') as HTMLMetaElement;
    if (frameOptionsTag) {
      frameOptionsTag.setAttribute('content', option);
      console.info(`🧪 Test: X-Frame-Options configurado como: ${option}`);
    }
  }

  /**
   * Obtiene el estado actual de los headers de seguridad
   */
  getSecurityStatus(): { [key: string]: string | null } {
    const headers = [
      'X-Frame-Options',
      'X-Content-Type-Options', 
      'X-XSS-Protection',
      'Referrer-Policy',
      'Content-Security-Policy'
    ];

    const status: { [key: string]: string | null } = {};
    
    headers.forEach(header => {
      const element = this.document.querySelector(`meta[http-equiv="${header}"]`);
      status[header] = element ? element.getAttribute('content') : null;
    });

    return status;
  }

  /**
   * Deshabilita temporalmente la detección de clickjacking (solo para desarrollo)
   */
  disableClickjackingDetection(): void {
    const overlay = this.document.getElementById('clickjacking-warning');
    if (overlay) {
      overlay.remove();
      console.warn('⚠️ Detección de clickjacking deshabilitada temporalmente');
    }
    
    // Marcar como deshabilitado en sessionStorage
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem('clickjacking-detection-disabled', 'true');
    }
  }

  /**
   * Habilita nuevamente la detección de clickjacking
   */
  enableClickjackingDetection(): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem('clickjacking-detection-disabled');
      console.info('✅ Detección de clickjacking habilitada nuevamente');
    }
  }

  /**
   * Verifica si la detección está deshabilitada
   */
  private isClickjackingDetectionDisabled(): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;
    return sessionStorage.getItem('clickjacking-detection-disabled') === 'true';
  }
}