import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { PizzaService } from '../../services/pizza.service';
import { Ingredient } from '../../types/enums/ingredients.enum';
import { IngredientsListComponent } from "../ingredients-list/ingredients-list.component";

@Component({
  selector: 'app-ingredients',
  standalone: true,
  imports: [
    CommonModule
    // add ingredients list and selected ingredients components
    ,
    IngredientsListComponent
],
  templateUrl: './ingredients.component.html',
  styleUrl: './ingredients.component.scss'
})
export class IngredientsComponent {
// Instead of keeping a separate ingredients array, use the signal directly from PizzaService.
  // ingredients = computed(() => !!this.pizzaService.selectedIngredients());
  ingredients = computed(() => this.pizzaService.selectedIngredients()); // this is a array of SIGNAL, not a regular array


  constructor(private pizzaService: PizzaService) {}

  handleSelectIngredients(ingredients: Ingredient[]) {
    // Use PizzaService's signal update method to update selected ingredients.
    this.pizzaService.updateSelectedIngredients(ingredients);
  }

  handleDeleteIngredient(ingredient: Ingredient) {
    // Remove the ingredient from the list and update the signal.
    const updatedIngredients = this.ingredients().filter((i) => i !== ingredient);
    this.pizzaService.updateSelectedIngredients(updatedIngredients);
  }
}
