import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroComponent } from "./components/hero/hero.component";
import { AboutComponent } from "./components/about/about.component";
import { GaleryComponent } from "./components/galery/galery.component";
import { ContactFormComponent } from "./components/contact-form/contact-form.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeroComponent, AboutComponent, GaleryComponent, ContactFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'black-rose-web';

  services = [
    {
      icon: "📸",
      title: "Bodas",
      description: "Documentando tu día especial con un enfoque artístico y natural",
      price: "Desde $1500"
    },
    {
      icon: "👨‍👩‍👧‍👦",
      title: "Retratos Familiares",
      description: "Capturas auténticas de los momentos más especiales en familia",
      price: "Desde $300"
    },
    {
      icon: "🎉",
      title: "Eventos",
      description: "Cobertura profesional para todo tipo de eventos sociales",
      price: "Desde $500"
    }
  ];

  
}
