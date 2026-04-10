import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';
import { guestGuard } from './core/guest.guard';
import { LandingPageComponent } from './pages/landing-page.component';
import { SignInPageComponent } from './pages/sign-in-page.component';
import { SignUpPageComponent } from './pages/sign-up-page.component';
import { WelcomePageComponent } from './pages/welcome-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'sign-in',
    component: SignInPageComponent,
    canActivate: [guestGuard]
  },
  {
    path: 'sign-up',
    component: SignUpPageComponent,
    canActivate: [guestGuard]
  },
  {
    path: 'welcome',
    component: WelcomePageComponent,
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
