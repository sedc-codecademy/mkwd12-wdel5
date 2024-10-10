import { Injectable, signal } from '@angular/core';
import { Pizza } from '../types/interfaces/pizza.interface';
import { Ingredient } from '../types/enums/ingredients.enum';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar'
import { catchError, Observable, of, tap } from 'rxjs';
import { apiUrl, snackBarConfig } from '../constants/app.constants';
import { Order, OrderBE, PizzaBE } from '../types/interfaces/order.interface';
import { convertIngredientsFeToBe } from '../helpers/pizza.helper';

@Injectable({
  providedIn: 'root' // This means that the service will be available in the whole application. It's deprecated, and will be set to 'root' as default in the following version of Angular.
})
// An Angular Service is an object (class) that can be used to share data between components.
export class PizzaService {
  // A signal to expose the active order value to the components.
  activeOrder = signal<Pizza[]>([]);
  selectedIngredients = signal<Ingredient[]>([]);

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) { }

  updateActiveOrder(order: Pizza[]): void {
    this.activeOrder.set(order);
  }

  updateSelectedIngredients(ingredients: Ingredient[]): void {
    this.selectedIngredients.set(ingredients);
  }

  getOrderForUser(isOrderForUser: boolean): Observable<Order[]> {
    const params = new HttpParams().set('isOrderForUser', isOrderForUser.toString());

    return this.http.get<Order[]>(`${apiUrl}/Order`, { params }).pipe(
      catchError((error) => {
        this.snackBar.open(error?.error?.errors?.[0] || `Error while fetching orders!`,
          'Close',
          snackBarConfig
        );
        return of([]);
      })
    )
  }

  submitOrder(addressTo: string, description: string): Observable<void> {
    const pizzas = this.activeOrder()

    // converting pizza object to fit BE body definition
    const mappedPizzas = pizzas.map((pizza) => ({
      name: pizza.name,
      description: pizza.description,
      price: Math.round(pizza.price), // workaround as BE doesn't accept decimals
      ingredients: convertIngredientsFeToBe(pizza.ingredients)
    })) satisfies PizzaBE[] // use satisfies instead of 'as' to avoid type casting

    const order = {
      pizzas: mappedPizzas,
      addressTo,
      description,
      orderPrice: Math.round(
        pizzas.reduce((acc, pizza) => acc + pizza.price, 0)
      ) // workaround as BE doesn't accept decimals
    } satisfies OrderBE

    return this.http.post<void>(`${apiUrl}/Order`, order).pipe(
      // tap operator is used to handle side effects like routing, notifications, etc.
      tap(() => {
        this.snackBar.open(
          'You have successfully created an order!',
          'Close',
          snackBarConfig
        )
      }),
      catchError((error) => { // catchError operator is used to handle errors
        if (error) {
          this.snackBar.open(
            error?.error?.errors?.[0] || 'Error while making an order!',
            'Close',
            snackBarConfig
          )
        }
        return of()
      })
    )
  }


  getSavedPizzas(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>(`${apiUrl}/Pizza`);
  }

  deletePizzaFromOrder(index: number): void {
    const updatedOrder = this.activeOrder()
    .filter((_, i) => i !== index);
  }

  deletePizza(id: number): Observable<void> {
    return this.http.delete<void>(`${apiUrl}/Pizza/${id}`).pipe(
      tap(() => {
        this.snackBar.open(
          'You have successfully deleted a pizza',
          'Close',
          snackBarConfig
        )
      }),
      catchError((error) => {
        this.snackBar.open(error?.error?.errors?.[0] || `Error while deleting pizza!`,
          'Close',
          snackBarConfig
        );
        return of();
      })
    )
  }

    // Default data for pizzas
    defaultPizzas: Pizza[] = [
      {
        id: 1,
        name: 'Margherita',
        price: 5,
        description: 'A classic with tomato sauce and mozzarella on a crispy crust.',
        image: '/assets/margherita.png',
        ingredients: [Ingredient.TOMATO_SAUCE, Ingredient.MOZZARELLA],
      },
      {
        id: 2,
        name: 'Neapolitan',
        price: 5,
        description: 'Traditional pizza with tomato sauce, mozzarella, and savory ham.',
        image: '/assets/neapolitan.png',
        ingredients: [
          Ingredient.TOMATO_SAUCE,
          Ingredient.MOZZARELLA,
          Ingredient.HAM,
        ],
      },
      {
        id: 3,
        name: 'Quatro Formagi',
        price: 6,
        description: 'A rich blend of four cheeses: Parmesan, Mozzarella, Blue Cheese, and Gorgonzola.',
        image: '/assets/quatro-formagi.png',
        ingredients: [
          Ingredient.PARMESAN,
          Ingredient.MOZZARELLA,
          Ingredient.BLUE_CHEESE,
          Ingredient.GORGONZOLA,
        ],
      },
      {
        id: 4,
        name: 'Bacon',
        price: 6,
        description: 'A tasty combination of crispy bacon, tomato sauce, and mozzarella.',
        image: '/assets/bacon.png',
        ingredients: [
          Ingredient.BACON,
          Ingredient.TOMATO_SAUCE,
          Ingredient.MOZZARELLA,
        ],
      },
      {
        id: 5,
        name: 'Bianca',
        description: 'A simple, creamy pizza topped with rich sour cream.',
        price: 6,
        image: '/assets/bianca.png',
        ingredients: [Ingredient.SOUR_CREAM],
      },
      {
        id: 6,
        name: 'Capricciosa',
        price: 6,
        description: 'A savory mix of ham, mushrooms, and mozzarella on tomato sauce.',
        image: '/assets/capri.png',
        ingredients: [
          Ingredient.HAM,
          Ingredient.TOMATO_SAUCE,
          Ingredient.MUSHROOMS,
          Ingredient.MOZZARELLA,
        ],
      },
      {
        id: 7,
        name: 'Mexicana',
        price: 6,
        description: 'A spicy pizza with gorgonzola, pepperoni, olives, and chili peppers.',
        image: '/assets/mexicana.png',
        ingredients: [
          Ingredient.TOMATO_SAUCE,
          Ingredient.GORGONZOLA,
          Ingredient.OLIVES,
          Ingredient.PEPPERONI,
          Ingredient.CHILLI_PEPPER,
        ],
      },
      {
        id: 8,
        name: 'Pepperoni',
        price: 6,
        description: 'A classic pepperoni pizza with gorgonzola and tomato sauce.',
        image: '/assets/pepperoni.png',
        ingredients: [
          Ingredient.TOMATO_SAUCE,
          Ingredient.GORGONZOLA,
          Ingredient.PEPPERONI,
        ],
      },
      {
        id: 9,
        name: 'Tuna',
        price: 6,
        description: 'Tuna, onion, and mozzarella on a tomato sauce base.',
        image: '/assets/tuna.png',
        ingredients: [
          Ingredient.TOMATO_SAUCE,
          Ingredient.TUNA,
          Ingredient.MOZZARELLA,
          Ingredient.ONION,
        ],
      },
      {
        id: 10,
        name: 'Vegetariana',
        price: 6,
        description: 'A veggie pizza with olives, mushrooms, and mozzarella on tomato sauce.',
        image: '/assets/vegetariana.png',
        ingredients: [
          Ingredient.TOMATO_SAUCE,
          Ingredient.MOZZARELLA,
          Ingredient.OLIVES,
          Ingredient.MUSHROOMS,
        ],
      },
    ]

}
