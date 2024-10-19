import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../../types/interfaces/order.interface';
import { PizzaService } from '../../services/pizza.service';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-previous-orders',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, MatButtonModule],
  templateUrl: './previous-orders.component.html',
  styleUrl: './previous-orders.component.scss'
})
export class PreviousOrdersComponent {
  orders$: Observable<Order[]> = new Observable<Order[]>();

  constructor(private pizzaService: PizzaService) {
  }

  ngOnInit(): void {
    this.orders$ = this.pizzaService.getOrderForUser(true);
  }

}
