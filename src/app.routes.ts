
import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const APP_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then(c => c.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('./components/register/register.component').then(c => c.RegisterComponent),
  },
  {
    path: 'discover',
    canActivate: [authGuard],
    loadComponent: () => import('./components/discover/discover.component').then(c => c.DiscoverComponent),
  },
  {
    path: 'matches',
    canActivate: [authGuard],
    loadComponent: () => import('./components/matches/matches.component').then(c => c.MatchesComponent),
  },
  {
    path: 'chat',
    canActivate: [authGuard],
    loadComponent: () => import('./components/chat-list/chat-list.component').then(c => c.ChatListComponent),
  },
  {
    path: 'chat/:id',
    canActivate: [authGuard],
    loadComponent: () => import('./components/chat-detail/chat-detail.component').then(c => c.ChatDetailComponent),
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () => import('./components/profile/profile.component').then(c => c.ProfileComponent),
  },
  { path: '', redirectTo: 'discover', pathMatch: 'full' },
  { path: '**', redirectTo: 'discover' },
];
