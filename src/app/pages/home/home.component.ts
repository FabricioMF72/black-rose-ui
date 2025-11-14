import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { AboutComponent } from '../../components/about/about.component';
import { GalleryComponent } from '../../components/gallery/gallery.component';
import { ReviewsComponent } from '../../components/reviews/reviews.component';
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';
import { SeoService } from '../../services/seo.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, AboutComponent, GalleryComponent, ReviewsComponent, ContactFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private seoService: SeoService) {}

  ngOnInit() {
    // Manejar posibles duplicados primero
    this.seoService.handlePotentialDuplicates();
    
    // Usar el método específico para Home que incluye canonical
    this.seoService.setHomeSeo();

    // Structured data for home page - usar URL consistente del service
    const baseUrl = this.seoService.getBaseUrl();
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Kendra Sáenz",
      "jobTitle": "Professional Photographer",
      "url": `${baseUrl}/`,
      "sameAs": [
        "https://instagram.com/kendrasaenzphoto",
        "https://facebook.com/kendrasaenzphoto"
      ],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Uvita",
        "addressRegion": "Pérez Zeledón",
        "addressCountry": "Costa Rica"
      },
      "offers": {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Wedding Photography",
          "description": "Professional wedding photography services in Costa Rica"
        }
      }
    };

    this.seoService.createStructuredData(structuredData);
  }
}
