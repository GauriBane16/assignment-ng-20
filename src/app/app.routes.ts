import { Routes } from '@angular/router';
import { List } from './component/list/list';
import { Details } from './component/details/details';
import { Home } from './component/home/home';

export const routes: Routes = [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: List },
    { path: 'home', component: Home},
    { path: 'details/:id', component: Details },
    { path: '**', redirectTo: '' }
];
