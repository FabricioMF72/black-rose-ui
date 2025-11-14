import { Routes } from '@angular/router';
import { PricingComponent } from './pages/pricing/pricing.component';
import { BlogComponent } from './pages/blog/blog.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ArticleComponent } from './pages/article/article.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    // Redireccionar variaciones comunes de home a la ruta principal
    {
        path: 'home',
        redirectTo: '',
        pathMatch: 'full'
    },
    {
        path: 'index',
        redirectTo: '',
        pathMatch: 'full'
    },
    {
        path: 'index.html',
        redirectTo: '',
        pathMatch: 'full'
    },
    {
        path: 'pricing',
        component: PricingComponent
    },
    {
        path: 'blog',
        component: BlogComponent
    },
    {
        path: 'contact',
        component: ContactFormComponent
    },
    {
        path: 'article/:name',
        component: ArticleComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
