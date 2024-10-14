import { Component, computed } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { PizzaCardsComponent } from '../pizza-cards/pizza-cards.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    PizzaCardsComponent,
    MatCardModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  isLoggedIn = computed(() => this.authService.isLoggedIn());

  constructor(
    private authService: AuthService,
  ) {}
}
