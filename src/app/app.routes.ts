import { Routes } from '@angular/router';
import { PricingComponent } from './pages/pricing/pricing.component';
import { BlogComponent } from './pages/blog/blog.component';
import { HomeComponent } from './pages/home/home.component';

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
