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

  constructor(private route: ActivatedRoute, private articleService: ArticleService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const articleName = params['name'];
      this.article.set(this.articleService.getArticleByName(articleName));
    });
  }
}
