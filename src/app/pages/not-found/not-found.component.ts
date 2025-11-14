import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { HttpStatusService } from '../../services/http-status.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="not-found-container">
      <div class="not-found-content">
        <h1>404</h1>
        <h2>Página no encontrada</h2>
        <p>Lo sentimos, la página que estás buscando no existe.</p>
        <a routerLink="/" class="home-button">Volver al inicio</a>
      </div>
    </div>
  `,
  styles: [`
    .not-found-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 60vh;
      padding: 2rem;
    }

    .not-found-content {
      text-align: center;
      max-width: 600px;
    }

    h1 {
      font-size: 6rem;
      font-weight: bold;
      color: #dc3545;
      margin: 0;
      line-height: 1;
    }

    h2 {
      font-size: 2rem;
      color: #333;
      margin: 1rem 0;
    }

    p {
      font-size: 1.1rem;
      color: #666;
      margin-bottom: 2rem;
      line-height: 1.6;
    }

    .home-button {
      display: inline-block;
      background-color: #007bff;
      color: white;
      padding: 0.75rem 2rem;
      text-decoration: none;
      border-radius: 5px;
      font-weight: 500;
      transition: background-color 0.3s ease;
    }

    .home-button:hover {
      background-color: #0056b3;
      text-decoration: none;
      color: white;
    }

    @media (max-width: 768px) {
      h1 {
        font-size: 4rem;
      }
      
      h2 {
        font-size: 1.5rem;
      }
      
      .not-found-container {
        min-height: 50vh;
        padding: 1rem;
      }
    }
  `]
})
export class NotFoundComponent implements OnInit {

  constructor(
    private httpStatusService: HttpStatusService,
    private meta: Meta,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.httpStatusService.set404();
    
    // Set proper meta tags for SEO with canonical
    this.title.setTitle('404 - Página no encontrada | Black Rose');
    this.meta.updateTag({ name: 'description', content: 'La página que buscas no existe. Vuelve a la página principal para explorar nuestros servicios.' });
    this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
  }
}