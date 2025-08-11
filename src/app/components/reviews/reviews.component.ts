import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent {
  reviews = [
    {
      id: 1,
      name: "Carmen Diu",
      rating: 5,
      message: "They’re better than I expected. So fun and loving. Absolutely amazing. You’re so talented and you know how to capture the LOVE 🩷 wow. I’m crying this is so beautifu.",
      photo: "Carmen-Kevin-wedding (1).webp",
      platform: "WhatsApp",
      platformIcon: "fab fa-whatsapp"
    },
    {
      id: 2,
      name: "Barbara Seller",
      rating: 5,
      message: "We are extremely happy with the results. It was an absolute pleasure to meet and work with you!!!",
      photo: "familia-1.jpg",
      platform: "WhatsApp",
      platformIcon: "fab fa-whatsapp"
    },
    {
      id: 3,
      name: "Tania Ramírez",
      rating: 5,
      message: "Thank you!! They’re awesome! 💙",
      photo: "review3.jpg",
      platform: "WhatsApp",
      platformIcon: "fab fa-whatsapp"
    },
    {
      id: 4,
      name: "Okalin Valverde",
      rating: 5,
      message: "Muchas gracias por todo tu me ayudaste un montón, no tengo cómo agradecértelo.",
      photo: "review4.jpg",
      platform: "WhatsApp",
      platformIcon: "fab fa-whatsapp"
    }
  ];

  getStarsArray(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i < rating ? 1 : 0);
  }
}
