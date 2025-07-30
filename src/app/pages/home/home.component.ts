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
    this.seoService.updateMetaTags({
      title: 'Kendra Sáenz Photography - Capturing Unforgettable Moments in Costa Rica',
      description: 'Professional wedding and portrait photographer in Uvita & Pérez Zeledón, Costa Rica. Capturing your special moments with artistic vision and passion.',
      keywords: 'Costa Rica photographer, Uvita wedding photographer, Pérez Zeledón photography, wedding photography, outdoor photography, portrait photography',
      url: 'https://black-rose-ui-gamma.vercel.app/',
      type: 'website'
    });

    // Structured data for home page
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Kendra Sáenz",
      "jobTitle": "Professional Photographer",
      "url": "https://black-rose-ui-gamma.vercel.app/",
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
