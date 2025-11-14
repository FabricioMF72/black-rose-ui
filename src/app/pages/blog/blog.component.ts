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
    // Usar el método específico para Blog que incluye canonical
    this.seoService.setBlogSeo();
  }
}
