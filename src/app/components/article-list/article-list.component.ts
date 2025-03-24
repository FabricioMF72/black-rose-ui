import { Component, computed } from '@angular/core';
import { ArticleItemComponent } from "../article-item/article-item.component";
import { CommonModule } from '@angular/common';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [ArticleItemComponent, CommonModule],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.scss'
})
export class ArticleListComponent {
  articles = computed(() => this.articleService.getArticles());
  constructor(private articleService: ArticleService) {}
}
