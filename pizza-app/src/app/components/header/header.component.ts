import { Component, computed } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isLoggedIn = computed(() => this.authService.isLoggedIn());

  constructor(
    private authService: AuthService,
  ) {
    console.log('Constructor called');
  }

  ngOnInit(): void {
    console.log('NgOnInit called');
  }

  onLogout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    console.log('NgOnDestroy called');
  }
}
