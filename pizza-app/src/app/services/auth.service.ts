import { Injectable, signal } from '@angular/core';
import { PizzaService } from './pizza.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Register } from '../types/interfaces/auth.inteface';
import { catchError, Observable, of, tap } from 'rxjs';
import { apiUrl, snackBarConfig } from '../constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = signal<boolean>(false);

  constructor(
    private pizzaService: PizzaService,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { this.isLoggedIn.set(!!localStorage.getItem('token')) }

  register(registerCredentials: Register): Observable<any> {
    return this.http
      .post(`${apiUrl}/User/register`, registerCredentials)
      .pipe(
        tap(() => {
          this.snackBar.open(
            'You have successfully registered!',
            'Close',
            snackBarConfig
          )
          this.router.navigate(['/login'])
        }),
        catchError((error) => {
          if (error) {
            this.snackBar.open(
              error?.error?.errors?.[0] ||
              'Error while registering',
              'Close',
              snackBarConfig
            )
          }
          return of(null)
        })
      )
  }
}
