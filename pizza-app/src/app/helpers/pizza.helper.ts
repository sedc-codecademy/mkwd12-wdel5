import { LARGE_INGREDIENT_PRICE, LARGE_PIZZA_PRICE, MEDIUM_INGREDIENT_PRICE, MEDIUM_PIZZA_PRICE, SMALL_INGREDIENT_PRICE, SMALL_PIZZA_PRICE } from "../constants/pizza-prices.constants";
import { Ingredient, IngredientBE } from "../types/enums/ingredients.enum";
import { PizzaSize } from "../types/enums/pizza-size.enum";

export function calculatePizzaPrice(size: PizzaSize, ingredients: Ingredient[]): number {
  switch (size) {
    case PizzaSize.LARGE:
      return (
        LARGE_PIZZA_PRICE + ingredients.length * LARGE_INGREDIENT_PRICE
      )
      case PizzaSize.MEDIUM:
      return (
        MEDIUM_PIZZA_PRICE + ingredients.length * MEDIUM_INGREDIENT_PRICE
      )
      case PizzaSize.SMALL:
      return (
        SMALL_PIZZA_PRICE + ingredients.length * SMALL_INGREDIENT_PRICE
      )
      default:
        return (
          MEDIUM_PIZZA_PRICE + ingredients.length * MEDIUM_INGREDIENT_PRICE
        )
  }
}

export function convertIngredientsFeToBe(ingredients: Ingredient[]): IngredientBE[] {
  return ingredients.map(ing => IngredientBE[ing as keyof typeof IngredientBE]);
}