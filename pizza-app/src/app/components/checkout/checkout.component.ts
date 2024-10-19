import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PizzaService } from '../../services/pizza.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  address: FormControl<string | null> = new FormControl<string | null>(
    '', // The FormControl is initialized with an empty string
    Validators.required // Required field by using Validators.required
  );
  description: FormControl<string | null> = new FormControl<string | null>('');

  constructor(
    private pizzaService: PizzaService,
    private roter: Router
  ) {}

  onSubmitOrder() {
    // Submit the order by calling submitOrder() method of the pizzaService. All the data is stored in pizzaService
    // and all HTTP requests are made in the pizzaService (or any other service).
    // The component is used only to display data
    this.pizzaService.submitOrder(this.address.value ?? '', this.description.value ?? '').subscribe();
    this.pizzaService.updateActiveOrder([]);
    this.roter.navigate(['/']);
  }

}
