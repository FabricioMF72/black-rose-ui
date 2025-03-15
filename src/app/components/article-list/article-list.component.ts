import { Component } from '@angular/core';
import { ArticleItemComponent } from "../article-item/article-item.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [ArticleItemComponent,CommonModule],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.scss'
})
export class ArticleListComponent {
  articles: { title: string, description: string, image: string, location:string, link: string }[] = [
    {
      title: 'The Smith Family Wedding in Uvita',
      description:  'The Smith family wedding in Uvita was a beautiful event that took place on the beach. The ceremony was held at sunset, and the reception was held at a nearby hotel. The bride and groom were surrounded by family and friends, and the day was filled with love and laughter.',
      image: 'galery-1.jpg',
      location: 'Uvita, Costa Rica',
      link: 'https://example.com/article-1'
    },
    {
      title: 'Los gigantes resort in Pérez Zeledón',
      description: 'Los gigantes resort in Pérez Zeledón is a beautiful place to stay. The resort is located in the mountains, and the views are breathtaking. The rooms are spacious and comfortable, and the staff is friendly and helpful. The food is delicious, and there are many activities to enjoy, such as hiking, horseback riding, and swimming.',
      image: 'outdoor-1.jpg',
      location: 'Los gigantes, Pérez Zeledón, Costa Rica',
      link: 'https://example.com/article-1'
    },
    {
      title: 'Nature Photography',
      description: 'loreum ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
      image: 'galery-1.jpg',
      location: 'Uvita, Costa Rica',
      link: 'https://example.com/article-1'
    }
  ];
}
