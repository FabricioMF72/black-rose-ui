import { Component } from '@angular/core';
import { HeroComponent } from "../hero/hero.component";
import { AboutComponent } from "../about/about.component";
import { GaleryComponent } from "../galery/galery.component";
import { ContactFormComponent } from "../contact-form/contact-form.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, AboutComponent, GaleryComponent, ContactFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
