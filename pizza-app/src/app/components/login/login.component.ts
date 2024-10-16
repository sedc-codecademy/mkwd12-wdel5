import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login } from '../../types/interfaces/auth.inteface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  hidePassword: boolean = true;

  loginForm: FormGroup = new FormGroup({
    username: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(8)])
  })

  get hasNameRequiredError(): boolean {
    return !!(this.loginForm.get('username')?.hasError('required') &&
      (this.loginForm.get('username')?.touched || this.loginForm.get('username')?.dirty)
    )
  }

  get hasPasswordRequiredError(): boolean {
    return !!(this.loginForm.get('password')?.hasError('required') &&
      (this.loginForm.get('password')?.touched || this.loginForm.get('password')?.dirty)
    )
  }

  constructor(
    private authService: AuthService
  ) {}

  onLogin() {
    this.authService.login(this.loginForm.value as Login)
    .subscribe(); // we have to subscribe in order to execute the observable
  }



}
