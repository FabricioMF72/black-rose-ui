import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private baseUrl = 'https://www.kendraphotography.com'; // CAMBIAR por tu dominio real

  constructor(
    private meta: Meta,
    private title: Title,
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  /**
   * Método público para obtener la URL base consistente
   */
  getBaseUrl(): string {
    return this.baseUrl;
  }

  updateTitle(title: string): void {
    this.title.setTitle(title);
  }

  updateMetaTags(config: {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: string;
    canonical?: string;
  }): void {
    if (config.title) {
      this.title.setTitle(config.title);
      this.meta.updateTag({ property: 'og:title', content: config.title });
      this.meta.updateTag({ name: 'twitter:title', content: config.title });
    }

    if (config.description) {
      this.meta.updateTag({ name: 'description', content: config.description });
      this.meta.updateTag({ property: 'og:description', content: config.description });
      this.meta.updateTag({ name: 'twitter:description', content: config.description });
    }

    if (config.keywords) {
      this.meta.updateTag({ name: 'keywords', content: config.keywords });
    }

    if (config.image) {
      this.meta.updateTag({ property: 'og:image', content: config.image });
      this.meta.updateTag({ name: 'twitter:image', content: config.image });
    }

    // Establecer URL canónica
    const canonicalUrl = config.canonical || config.url || this.getCurrentCanonicalUrl();
    this.setCanonicalUrl(canonicalUrl);

    if (config.url || canonicalUrl) {
      this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
      this.meta.updateTag({ name: 'twitter:url', content: canonicalUrl });
    }

    if (config.type) {
      this.meta.updateTag({ property: 'og:type', content: config.type });
    }

    // Twitter Card
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:site', content: '@BlackRose' });
    
    // Robots por defecto
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
  }

  createStructuredData(data: any): void {
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    
    // Remove existing structured data
    const existingScript = this.document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }
    
    this.document.head.appendChild(script);
  }

  /**
   * Establece la URL canónica de la página
   */
  setCanonicalUrl(url: string): void {
    if (isPlatformBrowser(this.platformId)) {
      // Remover canonical existente
      const existingCanonical = this.document.querySelector('link[rel="canonical"]');
      if (existingCanonical) {
        existingCanonical.remove();
      }

      // Agregar nueva canonical
      const link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      link.setAttribute('href', url);
      this.document.head.appendChild(link);
    }
  }

  /**
   * Obtiene la URL canónica actual basada en la ruta del router
   */
  private getCurrentCanonicalUrl(): string {
    const currentRoute = this.router.url;
    // Limpiar parámetros de query y fragmentos para URL limpia
    let cleanRoute = currentRoute.split('?')[0].split('#')[0];
    
    // Normalizar rutas comunes que podrían generar duplicados
    if (cleanRoute === '/home' || cleanRoute === '/index' || cleanRoute === '/index.html') {
      cleanRoute = '/';
    }
    
    // Asegurar que termine sin slash (excepto root)
    if (cleanRoute !== '/' && cleanRoute.endsWith('/')) {
      cleanRoute = cleanRoute.slice(0, -1);
    }
    
    return `${this.baseUrl}${cleanRoute}`;
  }

  /**
   * Configuración SEO completa para páginas específicas
   */
  setPageSeo(config: {
    title: string;
    description: string;
    keywords?: string;
    image?: string;
    type?: string;
    canonical?: string;
  }): void {
    this.updateMetaTags({
      ...config,
      canonical: config.canonical || this.getCurrentCanonicalUrl()
    });
  }

  /**
   * SEO para página de inicio
   */
  setHomeSeo(): void {
    this.setSeoWithValidation({
      title: 'Kendra Sáenz Photography - Professional Wedding & Portrait Photographer Costa Rica',
      description: 'Award-winning wedding photographer specializing in authentic moments and natural beauty in Costa Rica. Based in Uvita, serving couples throughout Pérez Zeledón with artistic vision and personalized service.',
      keywords: 'Costa Rica photographer, Uvita wedding photographer, Pérez Zeledón photography, wedding photography, outdoor photography, portrait photography',
      canonical: `${this.baseUrl}/`,
      type: 'website',
      pagePath: 'home'
    });
  }

  /**
   * SEO para página de precios
   */
  setPricingSeo(): void {
    this.setSeoWithValidation({
      title: 'Photography Packages & Pricing - Kendra Sáenz Photography Costa Rica',
      description: 'Transparent pricing for wedding, event, and portrait photography packages. Choose from intimate ceremonies, outdoor adventures, or business branding sessions. Custom packages available for your unique vision.',
      keywords: 'photography services Costa Rica, event coverage, outdoor sessions, business photography, weddings Uvita, photographer Pérez Zeledón',
      canonical: `${this.baseUrl}/pricing`,
      type: 'website',
      pagePath: 'pricing'
    });
  }

  /**
   * SEO para página del blog
   */
  setBlogSeo(): void {
    this.setSeoWithValidation({
      title: 'Photography Blog - Wedding Stories & Tips | Kendra Sáenz Photography',
      description: 'Behind-the-scenes wedding stories, photography techniques, and client features from tropical destinations. Explore real ceremonies, engagement shoots, and creative inspiration from our portfolio.',
      keywords: 'photography blog, Costa Rica weddings, Uvita photography, wedding stories, photography inspiration',
      canonical: `${this.baseUrl}/blog`,
      type: 'website',
      pagePath: 'blog'
    });
  }

  /**
   * SEO para página de contacto
   */
  setContactSeo(): void {
    this.setSeoWithValidation({
      title: 'Contact - Book Your Photography Session | Kendra Sáenz Photography',
      description: 'Ready to capture your story? Schedule a consultation for your dream photography session. Available for weddings, engagements, and portraits throughout Costa Rica. Free quotes and flexible scheduling.',
      keywords: 'contact photographer Costa Rica, book photography session, wedding photographer contact, Uvita photographer, Pérez Zeledón photography booking',
      canonical: `${this.baseUrl}/contact`,
      type: 'website',
      pagePath: 'contact'
    });
  }

  /**
   * Método genérico para prevenir contenido duplicado
   * Establece canonical y meta tags anti-duplicados
   */
  preventDuplicateContent(preferredUrl: string, currentUrl?: string): void {
    // Siempre usar la URL preferida como canonical
    this.setCanonicalUrl(preferredUrl);
    
    // Agregar meta tag para prevenir indexación de URLs duplicadas
    if (currentUrl && currentUrl !== preferredUrl) {
      this.meta.updateTag({ name: 'robots', content: 'noindex, follow' });
    } else {
      this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    }
  }

  /**
   * Configuración especial para URLs que pueden tener duplicados
   */
  handlePotentialDuplicates(): void {
    const currentUrl = this.getCurrentCanonicalUrl();
    const currentRoute = this.router.url;

    // Si detectamos rutas que podrían ser duplicadas, redirigir al canonical
    const duplicatePatterns = ['/home', '/index', '/index.html'];
    
    if (duplicatePatterns.some(pattern => currentRoute.startsWith(pattern))) {
      this.preventDuplicateContent(`${this.baseUrl}/`, currentUrl);
    }
  }

  /**
   * Verificar y prevenir títulos duplicados
   */
  private usedTitles: Set<string> = new Set();
  private usedDescriptions: Set<string> = new Set();

  validateUniqueTitle(title: string, pagePath: string): string {
    const normalizedTitle = title.toLowerCase().trim();
    
    if (this.usedTitles.has(normalizedTitle)) {
      console.warn(`⚠️ TÍTULO DUPLICADO DETECTADO: "${title}" en ${pagePath}`);
      // Agregar el path para hacer el título único
      const uniqueTitle = `${title} - ${pagePath.replace('/', '').replace('-', ' ').toUpperCase()}`;
      this.usedTitles.add(uniqueTitle.toLowerCase().trim());
      return uniqueTitle;
    }
    
    this.usedTitles.add(normalizedTitle);
    return title;
  }

  /**
   * Verificar y prevenir descriptions duplicadas
   */
  validateUniqueDescription(description: string, pagePath: string): string {
    const normalizedDesc = description.toLowerCase().trim();
    
    if (this.usedDescriptions.has(normalizedDesc)) {
      console.warn(`⚠️ DESCRIPTION DUPLICADA DETECTADA: "${description.substring(0, 50)}..." en ${pagePath}`);
      
      // Generar description única agregando contexto específico de la página
      const pageContext = this.getPageContext(pagePath);
      const uniqueDescription = `${description} ${pageContext}`;
      this.usedDescriptions.add(uniqueDescription.toLowerCase().trim());
      return uniqueDescription;
    }
    
    this.usedDescriptions.add(normalizedDesc);
    return description;
  }

  /**
   * Obtener contexto específico para hacer descriptions únicas
   */
  private getPageContext(pagePath: string): string {
    const contexts: { [key: string]: string } = {
      'home': 'Discover our signature photography style and approach.',
      'pricing': 'View detailed package information and booking details.',
      'blog': 'Read client stories and photography insights.',
      'contact': 'Get personalized consultation and custom quotes.',
      'article': 'Explore this unique photography story and inspiration.'
    };
    
    const page = pagePath.toLowerCase().includes('article') ? 'article' : 
                 pagePath.replace('/', '').toLowerCase();
    
    return contexts[page] || 'Learn more about our photography services.';
  }

  /**
   * Método mejorado para establecer SEO con validación de duplicados
   */
  setSeoWithValidation(config: {
    title: string;
    description: string;
    keywords?: string;
    image?: string;
    type?: string;
    canonical?: string;
    pagePath?: string;
  }): void {
    // Validar título y description únicos
    const pagePath = config.pagePath || this.router.url;
    const validatedTitle = this.validateUniqueTitle(config.title, pagePath);
    const validatedDescription = this.validateUniqueDescription(config.description, pagePath);
    
    this.updateMetaTags({
      ...config,
      title: validatedTitle,
      description: validatedDescription,
      canonical: config.canonical || this.getCurrentCanonicalUrl()
    });
  }

  /**
   * Método para limpiar cache de títulos y descriptions (útil para testing)
   */
  clearSeoCache(): void {
    this.usedTitles.clear();
    this.usedDescriptions.clear();
  }

  /**
   * Método legacy para compatibilidad
   */
  clearTitleCache(): void {
    this.clearSeoCache();
  }
}
