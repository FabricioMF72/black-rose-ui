import { Injectable, signal } from '@angular/core';
import Article from '../models/article';

@Injectable({
    providedIn: 'root',
})
export class ArticleService {
    private articles = signal<Article[]>([
        {
            name: 'carmen kevin intimate wedding',
            link: 'carmen-kevin-intimate-wedding',
            title: 'Carmen & Kevin: An Intimate Wedding in Uvita, Costa Rica',
            paragraphs: ['Some love stories deserve to be told in settings as magical as the bond that unites them. Carmen and Kevin chose to travel to Uvita de Osa, Costa Rica, to celebrate their love with a private and special ceremony. No guests, no distractions — just the two of them, the sound of the ocean, and a breathtaking natural backdrop as witnesses to their promise.','A “Yes, I do” at Rocas de Amancio, Dominicalito 🌊💍','Early in the morning, Carmen and Kevin made their way to Rocas de Amancio, a hidden beach in Dominicalito, where towering rock formations and gentle waves created the perfect setting for their ceremony. The sunlight reflecting on the water and the fresh ocean breeze made every moment even more special. In an atmosphere of pure intimacy, they exchanged heartfelt vows filled with love and emotion, with the soothing sound of the ocean as their witness.','As a photographer, capturing these moments was truly a privilege. The soft morning light gave us a warm, natural atmosphere, highlighting every gesture, every glance, and every smile they shared on such a meaningful day.', 'Adventure at the Dominical Waterfall 🌿💦','After the ceremony, we headed to the Dominical Waterfall, a hidden corner of the jungle that offered the perfect contrast to the serenity of the beach.','Carmen and Kevin, still dressed in their wedding attire, enjoyed the breathtaking scenery surrounded by lush greenery and the soothing sound of water cascading over the rocks.','The photos at the waterfall were magical: the power of the water, the freshness of the surroundings, and the emotion of the moment were captured in every image. It was a unique and unforgettable experience that added a touch of adventure to their wedding photo session.'],
            location: 'Uvita, Costa Rica',
            images: ['galery-1.jpg','galery-2.jpg','galery-3.jpg'],

        },
        {
            name: 'carmen kevin intimate wedding',
            link: 'carmen-kevin-intimate-wedding',
            title: 'Carmen & Kevin: An Intimate Wedding in Uvita, Costa Rica',
            paragraphs: ['Some love stories deserve to be told in settings as magical as the bond that unites them. Carmen and Kevin chose to travel to Uvita de Osa, Costa Rica, to celebrate their love with a private and special ceremony. No guests, no distractions — just the two of them, the sound of the ocean, and a breathtaking natural backdrop as witnesses to their promise.'],
            location: 'Uvita, Costa Rica',
            images: ['galery-1.jpg','galery-2.jpg','galery-3.jpg'],

        },
        {
            name: 'carmen kevin intimate wedding',
            link: 'carmen-kevin-intimate-wedding',
            title: 'Carmen & Kevin: An Intimate Wedding in Uvita, Costa Rica',
            paragraphs: ['Some love stories deserve to be told in settings as magical as the bond that unites them. Carmen and Kevin chose to travel to Uvita de Osa, Costa Rica, to celebrate their love with a private and special ceremony. No guests, no distractions — just the two of them, the sound of the ocean, and a breathtaking natural backdrop as witnesses to their promise.'],
            location: 'Uvita, Costa Rica',
            images: ['galery-1.jpg','galery-2.jpg','galery-3.jpg'],

        },
    ]);

    getArticles() {
        return this.articles();
    }

    getArticleByName(link: string): Article | undefined {
        return this.articles().find((article) => article.link === link);
    }
}
