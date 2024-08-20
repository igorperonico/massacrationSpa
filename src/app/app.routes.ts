import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DiscographyComponent } from './components/discography/discography.component';
import { BiographyComponent } from './components/biography/biography.component';
import { FanAdminComponent } from './components/fan-admin/fan-admin.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, title: 'Massacration' },
    { path: 'discography', component: DiscographyComponent, title: 'Discography' },
    { path: 'biography', component: BiographyComponent, title: 'Biography' },
    { path: 'fan-admin', component: FanAdminComponent, title: 'Discography' }
];

