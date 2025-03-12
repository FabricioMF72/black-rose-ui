import { Routes } from '@angular/router';
import { PricingComponent } from './components/pricing/pricing.component';
import { HomeComponent } from './components/home/home.component';
import { BlogComponent } from './components/blog/blog.component';

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
    }
];
