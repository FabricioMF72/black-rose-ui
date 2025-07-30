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
            mainParagraph: 'Some love stories deserve to be told in settings as magical as the bond that unites them. Carmen and Kevin chose to travel to Uvita de Osa, Costa Rica, to celebrate their love with a private and special ceremony. No guests, no distractions — just the two of them, the sound of the ocean, and a breathtaking natural backdrop as witnesses to their promise.',
            paragraphs: [{ title: 'A “Yes, I do” at Rocas de Amancio, Dominicalito 🌊💍', text: 'Early in the morning, Carmen and Kevin made their way to Rocas de Amancio, a hidden beach in Dominicalito, where towering rock formations and gentle waves created the perfect setting for their ceremony. The sunlight reflecting on the water and the fresh ocean breeze made every moment even more special. In an atmosphere of pure intimacy, they exchanged heartfelt vows filled with love and emotion, with the soothing sound of the ocean as their witness.' }, { title: 'Adventure at the Dominical Waterfall 🌿💦', text: 'After the ceremony, we headed to the Dominical Waterfall, a hidden corner of the jungle that offered the perfect contrast to the serenity of the beach. Carmen and Kevin, still dressed in their wedding attire, enjoyed the breathtaking scenery surrounded by lush greenery and the soothing sound of water cascading over the rocks.' }],
            location: 'Uvita, Costa Rica',
            images: ['Carmen-Kevin-wedding (7).webp','Carmen-Kevin-wedding (1).webp','Carmen-Kevin-wedding (2).webp','Carmen-Kevin-wedding (3).webp','Carmen-Kevin-wedding (4).webp','Carmen-Kevin-wedding (5).webp','Carmen-Kevin-wedding (6).webp','Carmen-Kevin-wedding (8).webp','Carmen-Kevin-wedding (9).webp','Carmen-Kevin-wedding (10).webp','Carmen-Kevin-wedding (11).webp','Carmen-Kevin-wedding (12).webp'],

        },
        {
            name: 'Allison & Juan Jose',
            link: 'allison-juan-wedding',
            title: 'Allison & Juan Jose: A Heartfelt Wedding in Pérez Zeledón, Costa Rica',
            mainParagraph: 'Allison and Juan Jose’s wedding was a beautiful celebration of love, family, and the beginning of a new chapter in their lives. Set against the stunning backdrop of Pérez Zeledón, Costa Rica, their special day was filled with heartfelt moments and unforgettable memories.',
            paragraphs: [
                //Su boda fue la celebración perfecta de este nuevo capítulo, iniciando con una emotiva ceremonia en una capilla en Pérez Zeledón, donde compartieron sus votos rodeados de seres queridos. 

                {
                    title: 'A Beautiful Ceremony at the Church of San Isidro de El General ⛪💖',
                    text: 'Their wedding was the perfect celebration of this new chapter, starting with an emotional ceremony at a chapel in Pérez Zeledón, where they shared their vows surrounded by loved ones.'}
                //Después, nos aventuramos a las montañas de Jaular, en el Cerro de la Muerte, donde el frío y la neblina añadieron un toque mágico a la celebración. En una acogedora cabaña, disfrutaron de una cálida convivencia familiar, llena de risas, amor y momentos inolvidables.
                ,
                {
                    title: 'A Cozy Family Gathering in the Mountains of Jaular 🏔️❤️',
                    text: 'After the ceremony, we ventured to the mountains of Jaular, in Cerro de la Muerte, where the cold and mist added a magical touch to the celebration. In a cozy cabin, they enjoyed a warm family gathering filled with laughter, love, and unforgettable moments.'
                }
            ],
            location: 'Pérez Zeledón, Costa Rica',
            images: ['allison-wedding.jpg','allison-wedding-2.jpg','allison-wedding-4.jpg','allison-wedding-5.jpg','allison-wedding-6.jpg','allison-wedding-7.jpg','allison-wedding-8.jpg','allison-wedding-9.jpg'],

        },
        /*La historia de Bárbara y Daniel comenzó con un hermoso día en las montañas, donde nos reunimos en un encantador hotel rodeado de naturaleza. Desde el principio, los jardines del lugar nos regalaron el escenario perfecto para inmortalizar sus primeros momentos como pareja. Entre sonrisas y emociones, aprovechamos cada rincón del lugar para capturar la esencia de su amor en un entorno tan único como su historia.
La celebración continuó con la ceremonia frente al mar en Uvita de Osa, Costa Rica, donde la brisa y el sonido de las olas crearon una atmósfera mágica. Gracias a Raven, quien guió con amor y dedicación la ceremonia, el momento se volvió aún más especial. El altar, adornado con flores frescas y elementos simbólicos para ellos, reflejaba la conexión profunda entre Bárbara y Daniel, haciendo de este instante algo realmente único.
La tarde culminó con un atardecer espectacular, los colores del cielo, el mar y la tierra se unieron para crear una serie de imágenes que reflejan el amor y la complicidad de esta maravillosa pareja.
Cada momento fue un verdadero regalo, y me siento agradecida de haber sido parte de este día tan significativo en la vida de Bárbara y Daniel.
*/
        {
            name: 'Boda de Bárbara y Daniel',
            link: 'barbara-daniel-wedding',
            title: 'Bárbara & Daniel: Una Boda de Ensueño en Playa Hermosa, Costa Rica',
            mainParagraph: 'La historia de Bárbara y Daniel comenzó con un hermoso día en las montañas, donde nos reunimos en un encantador hotel rodeado de naturaleza. Desde el principio, los jardines del lugar nos regalaron el escenario perfecto para inmortalizar sus primeros momentos como pareja. Entre sonrisas y emociones, aprovechamos cada rincón del lugar para capturar la esencia de su amor en un entorno tan único como su historia.',
            paragraphs: [
                {
                    title: 'Un Encuentro Mágico en las Montañas 🌄💑',
                    text: 'La celebración continuó con la ceremonia frente al mar en Uvita de Osa, Costa Rica, donde la brisa y el sonido de las olas crearon una atmósfera mágica. Gracias a Raven, quien guió con amor y dedicación la ceremonia, el momento se volvió aún más especial. El altar, adornado con flores frescas y elementos simbólicos para ellos, reflejaba la conexión profunda entre Bárbara y Daniel, haciendo de este instante algo realmente único.'
                },
                {
                    title: 'Un Atardecer Inolvidable 🌅❤️',
                    text: 'La tarde culminó con un atardecer espectacular, los colores del cielo, el mar y la tierra se unieron para crear una serie de imágenes que reflejan el amor y la complicidad de esta maravillosa pareja.'
                }
            ],
            location: 'Uvita, Costa Rica',
            images: ['barbara-wedding-1.jpg','barbara-wedding-2.jpg','barbara-wedding-3.jpg','barbara-wedding-4.jpg','barbara-wedding-5.jpg','barbara-wedding-6.jpg','barbara-wedding-7.jpg','barbara-wedding-8.jpg','barbara-wedding-9.jpg','barbara-wedding-10.jpg'],

        },
    ]);

    getArticles() {
        return this.articles();
    }

    getArticleByName(link: string): Article | undefined {
        return this.articles().find((article) => article.link === link);
    }
}
