import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { CspService } from './services/csp.service';
import { SecurityHeadersService } from './services/security-headers.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, FooterComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'black-rose-web';

  constructor(
    private cspService: CspService,
    private securityService: SecurityHeadersService
  ) {}

  ngOnInit(): void {
    // Configurar seguridad completa
    this.initializeSecurity();
  }

  private initializeSecurity(): void {
    // 1. Configurar headers de seguridad (incluyendo X-Frame-Options)
    this.securityService.setupSecurityHeaders();
    
    // 2. Solo detectar clickjacking en producción
    if (!this.isDevMode()) {
      // Configurar protección adicional contra iframes
      this.securityService.setupIframeProtection();
      
      // Detectar intentos de clickjacking solo en producción
      setTimeout(() => {
        this.securityService.detectClickjackingAttempt();
      }, 1000); // Delay para evitar falsos positivos durante la carga
    } else {
      console.info('🔧 Modo desarrollo: protección clickjacking deshabilitada');
    }

    // 3. Configurar Content Security Policy
    if (this.isDevMode()) {
      this.cspService.setupDevelopmentCSP();
      console.info('🔶 CSP configurado para desarrollo');
    } else {
      this.cspService.setupCSP();
      console.info('🛡️ CSP configurado para producción');
    }

    // 4. Configurar listener de violaciones CSP
    this.cspService.setupCSPViolationListener();
    
    console.info('🛡️ Sistema de seguridad inicializado para modo:', this.isDevMode() ? 'desarrollo' : 'producción');
  }

  private isDevMode(): boolean {
    return !window.location.hostname.includes('vercel.app') &&
           !window.location.hostname.includes('kendraphotography.com') &&
           (window.location.hostname === 'localhost' || 
            window.location.hostname.startsWith('192.168.'));
  }

  /**
   * Método de utilidad para deshabilitar la advertencia de clickjacking desde la consola
   * Uso: window.disableClickjackingWarning()
   */
  ngAfterViewInit(): void {
    if (this.isDevMode()) {
      (window as any).disableClickjackingWarning = () => {
        this.securityService.disableClickjackingDetection();
      };
      console.info('🔧 Función de desarrollo disponible: window.disableClickjackingWarning()');
    }
  }
}
