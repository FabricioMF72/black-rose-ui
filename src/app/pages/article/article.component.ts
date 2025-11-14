import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, signal, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { SeoService } from '../../services/seo.service';
import Article from '../../models/article';
import { ContactFormComponent } from "../../components/contact-form/contact-form.component";

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [CommonModule, ContactFormComponent, NgOptimizedImage],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent {
  article = signal<Article | undefined>(undefined);
  visibleImages: string[] = [];
  currentIndex: number = 0;
  
  // Image viewer properties
  showImageViewer = false;
  selectedImage = '';
  selectedImageIndex = 0;
  allImages: string[] = [];

  constructor(
    private route: ActivatedRoute, 
    private articleService: ArticleService,
    private seoService: SeoService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const articleName = params['name'];
      const article = this.articleService.getArticleByName(articleName);
      this.article.set(article);
      this.updateVisibleImages();
      
      if (article) {
        this.allImages = article.images; // Initialize all images for viewer
        this.updateSEO(article);
      }
    });
  }

  private updateSEO(article: Article) {
    const baseUrl = this.seoService.getBaseUrl(); // URL consistente del service centralizado
    const articleUrl = `${baseUrl}/article/${article.link}`;
    const imageUrl = article.images.length > 0 ? `${baseUrl}/${article.images[0]}` : `${baseUrl}/main-image.jpg`;

    // Generar description única y específica para el artículo
    const uniqueDescription = this.generateUniqueArticleDescription(article);
    
    // Update meta tags with canonical URL usando validación anti-duplicados
    this.seoService.setSeoWithValidation({
      title: `${article.title} - Kendra Sáenz Photography`,
      description: uniqueDescription,
      keywords: `${article.location}, wedding photography, Costa Rica photography, ${article.name}`,
      image: imageUrl,
      canonical: articleUrl, // Establecer URL canónica explícita
      type: 'article',
      pagePath: `article-${article.name}` // Identificador único para el artículo
    });

    // Create structured data for Google
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": article.title,
      "description": article.mainParagraph,
      "image": imageUrl,
      "author": {
        "@type": "Person",
        "name": "Kendra Sáenz"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Kendra Sáenz Photography",
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/main-image.jpg`
        }
      },
      "datePublished": "2025-07-29",
      "dateModified": "2025-07-29",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": articleUrl
      }
    };

    this.seoService.createStructuredData(structuredData);
  }

  /**
   * Generar description única para cada artículo
   */
  private generateUniqueArticleDescription(article: Article): string {
    // Extraer las primeras 2 oraciones del párrafo principal
    const sentences = article.mainParagraph.split('.').filter(s => s.trim().length > 0);
    const firstSentences = sentences.slice(0, 2).join('. ') + '.';
    
    // Agregar información específica del artículo
    const locationInfo = article.location ? ` Located in ${article.location}, ` : ' ';
    const imageCount = article.images ? ` Featuring ${article.images.length} stunning photographs.` : '';
    
    // Construir description única
    let description = firstSentences + locationInfo + 'this photography story showcases authentic moments and artistic vision.' + imageCount;
    
    // Asegurar que no exceda 160 caracteres
    if (description.length > 160) {
      description = description.substring(0, 157) + '...';
    }
    
    return description;
  }

  updateVisibleImages() {
    const images = this.article()?.images || [];
    this.visibleImages = images.slice(this.currentIndex, this.currentIndex + 3);
  }

  nextImages() {
    const images = this.article()?.images || [];
    if (this.currentIndex + 3 < images.length) {
      this.currentIndex += 3;
      this.updateVisibleImages();
    }
  }

  prevImages() {
    if (this.currentIndex - 3 >= 0) {
      this.currentIndex -= 3;
      this.updateVisibleImages();
    }
  }

  // Image viewer methods
  openImageViewer(image: string): void {
    this.selectedImage = image;
    this.selectedImageIndex = this.allImages.indexOf(image);
    this.showImageViewer = true;
    this.preloadImage(image);
  }

  closeImageViewer(): void {
    this.showImageViewer = false;
  }

  nextImageInViewer(): void {
    if (this.selectedImageIndex < this.allImages.length - 1) {
      this.selectedImageIndex++;
      this.selectedImage = this.allImages[this.selectedImageIndex];
      this.preloadImage(this.selectedImage);
    }
  }

  previousImageInViewer(): void {
    if (this.selectedImageIndex > 0) {
      this.selectedImageIndex--;
      this.selectedImage = this.allImages[this.selectedImageIndex];
      this.preloadImage(this.selectedImage);
    }
  }

  private preloadImage(src: string): void {
    const img = new Image();
    img.src = src;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if (!this.showImageViewer) return;
    
    switch (event.key) {
      case 'Escape':
        this.closeImageViewer();
        break;
      case 'ArrowLeft':
        this.previousImageInViewer();
        break;
      case 'ArrowRight':
        this.nextImageInViewer();
        break;
    }
  }
}
