import { Routes } from '@angular/router';
import { PricingComponent } from './pages/pricing/pricing.component';
import { BlogComponent } from './pages/blog/blog.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ArticleComponent } from './pages/article/article.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
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
        redirectTo: ''
    }
];
