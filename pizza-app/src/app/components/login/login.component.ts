import { Component } from '@angular/core';
import { PizzaService } from '../../services/pizza.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(
    private pizzaService: PizzaService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {


    this.authService.login({
      username: "Aneta",
      password: "Aneta1234!"
    }).subscribe(result => {
      console.log(result);
    })

    
    this.pizzaService.getOrderForUser(true).subscribe(result => {
      console.log(result);
    })
  }

}
