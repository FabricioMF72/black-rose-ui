import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { AboutComponent } from '../../components/about/about.component';
import { GalleryComponent } from '../../components/gallery/gallery.component';
import { ReviewsComponent } from '../../components/reviews/reviews.component';
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, AboutComponent, GalleryComponent, ReviewsComponent, ContactFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
