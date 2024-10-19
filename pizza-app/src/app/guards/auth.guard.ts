import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// guard must return one of the following:
// Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
export const authGuard: CanActivateFn = (route, state) => {
  const authservice = inject(AuthService); // inject is used to inject a service into a function
  const routerService = inject(Router);

  if(!authservice.isLoggedIn()) {
    // return routerService.createUrlTree(['/login']);
    // return routerService.navigate(['/login']);

    // option - if I want to tell the user that they are not allowed to access that route
    return routerService.navigate(['/not-allowed']);
  }

  return true;
};
