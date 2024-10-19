import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotAllowedComponent } from './components/not-allowed/not-allowed.component';

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
  { 
    path: 'previous-orders', 
    loadComponent: () => import('./components/previous-orders/previous-orders.component').then(
      (module) => module.PreviousOrdersComponent
    )
  },
  { path: 'not-allowed', component: NotAllowedComponent},
  { path: '**', redirectTo: 'not-allowed' }
]; 
