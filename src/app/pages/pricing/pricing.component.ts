import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss'
})
export class PricingComponent {
  private readonly router = inject(Router);
  pricingPackages = [
    {
      name: "Wedding",
      price: "$599",
      featured: false,
      features: [
        "2 horas de cobertura",
        "100 fotos editadas",
        "Galería digital",
        "5 impresiones 8x10",
        "Entrega en 2 semanas"
      ]
    },
    {
      name: "Outdoor",
      price: "$499",
      featured: false,
      features: [
        "4 horas de cobertura",
        "200 fotos editadas",
        "Galería digital",
        "10 impresiones 8x10",
        "1 álbum fotográfico",
        "Entrega en 1 semana"
      ]
    },
    {
      name: "Family",
      price: "$499",
      featured: false,
      features: [
        "6 horas de cobertura",
        "300 fotos editadas",
        "Galería digital",
        "15 impresiones 8x10",
        "2 álbumes fotográficos",
        "Video resumen",
        "Entrega en 1 semana"
      ]
    }
  ];
  contactForPackage(packageName: string): void {  
    this.router.navigate(['/contact'], { queryParams: { package: packageName } });
  }
}
