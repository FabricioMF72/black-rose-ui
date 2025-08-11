import { TitleCasePipe, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [TitleCasePipe, NgOptimizedImage],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  scrollToServices(): void {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  }
}
