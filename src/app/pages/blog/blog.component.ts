import { Component } from '@angular/core';
import { ArticleListComponent } from "../../components/article-list/article-list.component";

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [ArticleListComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {

}
