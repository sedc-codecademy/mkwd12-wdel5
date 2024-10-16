import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { NormalizeEnumPipe } from '../../pipes/normalize-enum.pipe';
import { PizzaService } from '../../services/pizza.service';
import { Ingredient } from '../../types/enums/ingredients.enum';
import { MatChipOption } from '@angular/material/chips';

@Component({
  selector: 'app-ingredients-list',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    NormalizeEnumPipe
  ],
  templateUrl: './ingredients-list.component.html',
  styleUrl: './ingredients-list.component.scss'
})
export class IngredientsListComponent {
  // Accessing the selected ingredients directly from the signal in the service.
  selectedIngredients = input<Ingredient[]>([]);

  // onSelectIngredients is used to emit the selected items to the parent component
  // This is not a regular datat type property, it is an event emitter
  onSelectIngredients = output<Ingredient[]>()

  // ingredients are used to display the INITIAL list of ingredients. This list is not updated in case of deletion in the sibling component
  // Enums are actually objects in JS/TS, so we need to use Object.values() to get the values of the enum
  ingredients: Ingredient[] = Object.values(Ingredient)

  constructor(private pizzaService: PizzaService){}

  onSelect(event: any) {
    // Emit the selected items to the parent component by using .emit() on the output reference
    this.onSelectIngredients.emit(
        event.source.selectedOptions.selected.map(
            (item: MatChipOption) => item.value
        )
    );
}
}
