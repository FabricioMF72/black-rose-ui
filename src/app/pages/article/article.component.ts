import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { SeoService } from '../../services/seo.service';
import Article from '../../models/article';
import { ContactFormComponent } from "../../components/contact-form/contact-form.component";

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [CommonModule, ContactFormComponent],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent {
  article = signal<Article | undefined>(undefined);
  visibleImages: string[] = [];
  currentIndex: number = 0;

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
        this.updateSEO(article);
      }
    });
  }

  private updateSEO(article: Article) {
    const baseUrl = 'https://black-rose-ui-gamma.vercel.app';
    const articleUrl = `${baseUrl}/article/${article.link}`;
    const imageUrl = article.images.length > 0 ? `${baseUrl}/${article.images[0]}` : `${baseUrl}/main-image.jpg`;

    // Update meta tags
    this.seoService.updateMetaTags({
      title: `${article.title} - Kendra Sáenz Photography`,
      description: article.mainParagraph.substring(0, 160) + '...',
      keywords: `${article.location}, wedding photography, Costa Rica photography, ${article.name}`,
      image: imageUrl,
      url: articleUrl,
      type: 'article'
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
}
