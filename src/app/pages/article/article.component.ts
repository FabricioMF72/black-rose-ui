import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import Article from '../../models/article';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent {
  article = signal<Article | undefined>(undefined);
  visibleImages: string[] = [];
  currentIndex: number = 0;

  constructor(private route: ActivatedRoute, private articleService: ArticleService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const articleName = params['name'];
      this.article.set(this.articleService.getArticleByName(articleName));
      this.updateVisibleImages();
    });
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
