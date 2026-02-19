import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'lists',
    loadComponent: () => import('./pages/lists/lists.page').then((m) => m.ListsPage),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
