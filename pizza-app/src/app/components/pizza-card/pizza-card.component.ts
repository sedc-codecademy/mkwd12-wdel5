import { CommonModule } from '@angular/common';
import { Component, computed, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { Pizza } from '../../types/interfaces/pizza.interface';
import { AuthService } from '../../services/auth.service';
import { PizzaService } from '../../services/pizza.service';
import { Router } from '@angular/router';
import { NormalizeEnumPipe } from "../../pipes/normalize-enum.pipe";

@Component({
  selector: 'app-pizza-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule
    // custom pipe
    ,
    NormalizeEnumPipe
],
  templateUrl: './pizza-card.component.html',
  styleUrl: './pizza-card.component.scss'
})
export class PizzaCardComponent {
  @Input() pizza: Pizza | undefined;
  isLoggedIn = computed(() => this.authService.isLoggedIn());
  
  constructor(
    private authService: AuthService,
    private pizzaService: PizzaService,
    private router: Router
  ) {}

  selectPizza(): void {
    this.pizzaService.updateSelectedIngredients(
      this.pizza?.ingredients ?? []
    )
    this.router.navigate(['/pizza-maker']);
  }
}
