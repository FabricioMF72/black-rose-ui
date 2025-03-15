import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss'
})
export class PricingComponent {
  pricingPackages = [
    {
      name: "Básico",
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
      name: "Premium",
      price: "$999",
      featured: true,
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
      name: "Elite",
      price: "$1499",
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
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  }
}
