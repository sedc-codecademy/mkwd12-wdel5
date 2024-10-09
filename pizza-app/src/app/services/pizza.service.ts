import { Injectable, signal } from '@angular/core';
import { Pizza } from '../types/interfaces/pizza.interface';
import { Ingredient } from '../types/enums/ingredients.enum';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar'
import { catchError, Observable, of, tap } from 'rxjs';
import { apiUrl, snackBarConfig } from '../constants/app.constants';
import { Order } from '../types/interfaces/order.interface';

@Injectable({
  providedIn: 'root' // This means that the service will be available in the whole application. It's deprecated, and will be set to 'root' as default in the following version of Angular.
})
// An Angular Service is an object (class) that can be used to share data between components.
export class PizzaService {
  // A signal to expose the active order value to the components.
  activeOrder = signal<Pizza[]>([]);
  currentUser = signal<string | null>(null);
  selectedIngredients = signal<Ingredient[]>([]);

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) { }

  getOrderForUser(isOrderForUser: boolean): Observable<Order[]> {
    const params = new HttpParams().set('isOrderForUser', isOrderForUser.toString());

    return this.http.get<Order[]>(`${apiUrl}/Order`, { params }).pipe(
      tap((response: any) => {
        if (response && response.user && response.user.username) {
          this.currentUser.set(response.user.username)
        }
      }),
      catchError((error) => {
        this.snackBar.open(error?.error?.errors?.[0] || `Error while fetching orders!`,
          'Close',
          snackBarConfig
        );
        return of([]);
      })
    )
  }

  getSavedPizzas(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>(`${apiUrl}/Pizza`);
  }

}
