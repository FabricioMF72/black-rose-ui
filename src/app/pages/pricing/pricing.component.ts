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
      title: 'Photography Packages & Pricing - Kendra Sáenz Photography',
      description: 'Explore our wedding and photography packages in Costa Rica. Competitive pricing for professional photography services in Uvita and Pérez Zeledón.',
      keywords: 'photography pricing, wedding packages Costa Rica, photography rates, Uvita photographer prices',
      url: 'https://black-rose-ui-gamma.vercel.app/pricing',
      type: 'website'
    });
  }

  pricingPackages = [
    {
      name: "Wedding",
      price: "$599",
      featured: false,
      features: [
        "2 hours of coverage",
        "100 edited photos",
        "Digital gallery",
        "5 prints 8x10",
        "Delivery in 2 weeks"
      ]
    },
    {
      name: "Outdoor",
      price: "$499",
      featured: false,
      features: [
        "4 hours of coverage",
        "200 edited photos",
        "Digital gallery",
        "10 prints 8x10",
        "1 photo album",
        "Delivery in 1 week"
      ]
    },
    {
      name: "Family",
      price: "$499",
      featured: false,
      features: [
        "6 hours of coverage",
        "300 edited photos",
        "Digital gallery",
        "15 prints 8x10",
        "2 photo albums",
        "Summary video",
        "Delivery in 1 week"
      ]
    }
  ];
  contactForPackage(packageName: string): void {  
    this.router.navigate(['/contact'], { queryParams: { package: packageName } });
  }
}
