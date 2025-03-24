import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-article-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './article-item.component.html',
  styleUrl: './article-item.component.scss'
})
export class ArticleItemComponent {
  @Input() title!: string;
  @Input() paragraph!: string;
  @Input() image!: string[];
  @Input() link!: string;
  @Input() location!: string;
  @Input() layout: 'normal' | 'reverse' = 'normal';
}
