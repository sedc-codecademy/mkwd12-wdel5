import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  // localhost:4200
  { 
    path: '', 
    component: HomeComponent
  },
  { 
    path: 'register', 
    loadComponent: () => import('./components/register/register.component').then(
      (module) => module.RegisterComponent
    )
  },
  { 
    path: 'login', 
    loadComponent: () => import('./components/login/login.component').then(
      (module) => module.LoginComponent
    )
  },
  { 
    path: 'pizza-maker', 
    loadComponent: () => import('./components/pizza-maker/pizza-maker.component').then(
      (module) => module.PizzaMakerComponent
    )
  },
];
