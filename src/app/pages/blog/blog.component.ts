import { Component } from '@angular/core';
import { ArticleListComponent } from "../../components/article-list/article-list.component";
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [ArticleListComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {
  constructor(private seoService: SeoService) {}

  ngOnInit() {
    this.seoService.updateMetaTags({
      title: 'Blog - Kendra Sáenz Photography',
      description: 'Discover the latest wedding and photography stories from Costa Rica. Beautiful moments captured in Uvita, Pérez Zeledón and beyond.',
      keywords: 'photography blog, Costa Rica weddings, Uvita photography, wedding stories, photography inspiration',
      url: 'https://black-rose-ui-gamma.vercel.app/blog',
      type: 'website'
    });
  }
}
