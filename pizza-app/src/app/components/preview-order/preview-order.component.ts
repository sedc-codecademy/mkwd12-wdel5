import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { RouterLink } from '@angular/router';
import { NormalizeEnumPipe } from '../../pipes/normalize-enum.pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip'
import { PizzaService } from '../../services/pizza.service';
import { Order } from '../../types/interfaces/order.interface';
import { Pizza } from '../../types/interfaces/pizza.interface';

@Component({
  selector: 'app-preview-order',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    MatStepperModule,
    MatIconModule,
    RouterLink,
    NormalizeEnumPipe,
    MatTooltipModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  templateUrl: './preview-order.component.html',
  styleUrl: './preview-order.component.scss'
})
export class PreviewOrderComponent {
  activeOrder = computed(() => this.pizzaService.activeOrder());

  constructor(private pizzaService: PizzaService){}

  calculateTotalPrice(order: Pizza[] | null): number {
    if(!order) {
      return 0;
    }
    return order.reduce((sum, pizza) => (sum += pizza.price), 0);
  }

  onDeletePizza(index: number) {
    // Delete pizza from order in the pizza service which has all the logic and information for the order
    this.pizzaService.deletePizzaFromOrder(index);
  }
}
