import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent {
  reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      message: "Absolutely amazing photographer! The photos from our wedding were beyond our expectations. Every moment was captured perfectly.",
      photo: "familia-1.webp",
      platform: "Google Maps",
      platformIcon: "fab fa-google"
    },
    {
      id: 2,
      name: "Michael Chen",
      rating: 5,
      message: "Professional, creative, and so easy to work with. Our family photos turned out beautiful. Highly recommend!",
      photo: "ken-about.jpg",
      platform: "Instagram",
      platformIcon: "fab fa-instagram"
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      rating: 5,
      message: "The outdoor session was incredible! The photographer knew all the best spots and made us feel so comfortable.",
      photo: "outdoor-1.webp",
      platform: "Facebook",
      platformIcon: "fab fa-facebook"
    },
    {
      id: 4,
      name: "David Thompson",
      rating: 4,
      message: "Great experience overall. The photos were delivered on time and the quality was excellent. Will definitely book again.",
      photo: "outdoor-3.jpg",
      platform: "WhatsApp",
      platformIcon: "fab fa-whatsapp"
    }
  ];

  getStarsArray(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i < rating ? 1 : 0);
  }
}
