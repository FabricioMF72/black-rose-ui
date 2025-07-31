import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss'
})
export class PricingComponent {
  private readonly router = inject(Router);
  
  constructor(private seoService: SeoService) {}

  ngOnInit() {
    this.seoService.updateMetaTags({
      title: 'Photography Services - Events, Outdoor & Business | Kendra Sáenz Photography',
      description: 'Discover our photography services in Costa Rica: Event coverage, outdoor sessions and business photography. Professional photography in Uvita and Pérez Zeledón.',
      keywords: 'photography services Costa Rica, event coverage, outdoor sessions, business photography, weddings Uvita, photographer Pérez Zeledón',
      url: 'https://black-rose-ui-gamma.vercel.app/pricing',
      type: 'website'
    });
  }

  pricingPackages = [
    {
      name: "Events",
      title: "Event Coverage",
      idealFor: "small weddings, birthdays, parties, family gatherings, baby showers or special celebrations",
      description: "I capture every detail without interrupting the moment. I integrate naturally into the environment, capturing real emotions, genuine smiles and the essence of the event.",
      features: [
        "Coverage by hours (2, 3 or more, as needed)",
        "Digital gallery with edited photos",
        "Delivery in 10 business days",
        "Printed album option"
      ],
      highlight: "Perfect for those who want to remember every moment without worrying about photos"
    },
    {
      name: "Outdoor",
      title: "Outdoor Sessions",
      idealFor: "personal portraits, couples, families, pregnancies or creative sessions",
      description: "I accompany you in a relaxed experience, where I guide you in natural poses while you enjoy the environment. I work in locations like beaches, mountains, rivers or green areas, always seeking your essence in each image.",
      features: [
        "1 hour session",
        "Location of choice (I can suggest options)",
        "Digital gallery with 25 edited photos",
        "Option for additional photos or physical album"
      ],
      highlight: "For those who love spontaneous moments, nature and authentic memories"
    },
    {
      name: "Business",
      title: "Business Photography",
      idealFor: "entrepreneurs, personal brands, restaurants, accommodations or products",
      description: "I help you convey the value of your brand with professional images. Whether it's content for social media, photos of spaces or services, we take care of aesthetics and message together.",
      features: [
        "Prior consultation",
        "Personalized session according to business type",
        "Delivery in format optimized for web/social media",
        "Professional digital gallery"
      ],
      types: [
        "Personal branding (lifestyle portrait session)",
        "Product photography", 
        "Spaces (Airbnb, cafes, stores)",
        "Visual content for Instagram"
      ],
      highlight: "Your brand also communicates through images. Let's make it memorable"
    }
  ];
  contactForPackage(packageName: string): void {  
    this.router.navigate(['/contact'], { queryParams: { package: packageName } });
  }
}
