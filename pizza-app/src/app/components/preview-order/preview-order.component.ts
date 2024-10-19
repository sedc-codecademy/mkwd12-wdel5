import { PizzaService } from './../../services/pizza.service'
import { Component, OnInit, computed } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatListModule } from '@angular/material/list'
import { MatButtonModule } from '@angular/material/button'
import { MatStepperModule } from '@angular/material/stepper'
import { MatIconModule } from '@angular/material/icon'
import { MatTooltipModule } from '@angular/material/tooltip'
import { RouterLink } from '@angular/router'
import { Pizza } from '../../types/interfaces/pizza.interface'
import { NormalizeEnumPipe } from '../../pipes/normalize-enum.pipe'
import { MatFormFieldModule } from '@angular/material/form-field'
import { ReactiveFormsModule, Validators } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'

// Component for previewing order (second step of the order process)
@Component({
  selector: 'app-preview-order',
  standalone: true,
  templateUrl: './preview-order.component.html',
  styleUrls: ['./preview-order.component.scss'],
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
    MatInputModule,
  ],
})
export class PreviewOrderComponent {
  activeOrder = computed(() => this.pizzaService.activeOrder());

  constructor(private pizzaService: PizzaService) { }

  calculateTotalPrice(order: Pizza[] | null): number {
    if (!order) {
      return 0
    }
    return order.reduce((sum, pizza) => (sum += pizza.price), 0)
  }

  onDeletePizza(index: number) {
    // Delete pizza from order in the pizza service which has all the logic and information for the order
    this.pizzaService.deletePizzaFromOrder(index)
  }
}


