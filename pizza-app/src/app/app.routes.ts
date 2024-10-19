import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotAllowedComponent } from './components/not-allowed/not-allowed.component';
import { authGuard } from './guards/auth.guard';

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
    // we add the authGuard to the route, so that it will be executed before the component is loaded
    canActivate: [authGuard], 
    loadComponent: () => import('./components/pizza-maker/pizza-maker.component').then(
      (module) => module.PizzaMakerComponent
    )
  },
  { 
    path: 'previous-orders', 
    // we add the authGuard to the route, so that it will be executed before the component is loaded
    canActivate: [authGuard], 
    loadComponent: () => import('./components/previous-orders/previous-orders.component').then(
      (module) => module.PreviousOrdersComponent
    )
  },
  { path: 'not-allowed', component: NotAllowedComponent},
  { path: '**', redirectTo: 'not-allowed' }
]; 
