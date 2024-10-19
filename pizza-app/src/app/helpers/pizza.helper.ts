import { LARGE_INGREDIENT_PRICE, LARGE_PIZZA_PRICE, MEDIUM_INGREDIENT_PRICE, MEDIUM_PIZZA_PRICE, SMALL_INGREDIENT_PRICE, SMALL_PIZZA_PRICE } from "../constants/pizza-prices.constants";
import { Ingredient, IngredientBE } from "../types/enums/ingredients.enum";
import { PizzaSize } from "../types/enums/pizza-size.enum";

// Calculates the price of the pizza based on the size and chosen ingredients
export function calculatePizzaPrice(
  size: PizzaSize,
  ingredients: Ingredient[]
): number {
  switch (size) {
    case PizzaSize.LARGE:
      return (
        LARGE_PIZZA_PRICE + ingredients.length * LARGE_INGREDIENT_PRICE
      )
    case PizzaSize.MEDIUM:
      return (
        MEDIUM_PIZZA_PRICE +
        ingredients.length * MEDIUM_INGREDIENT_PRICE
      )
    case PizzaSize.SMALL:
      return (
        SMALL_PIZZA_PRICE + ingredients.length * SMALL_INGREDIENT_PRICE
      )
    default:
      return (
        MEDIUM_PIZZA_PRICE +
        ingredients.length * MEDIUM_INGREDIENT_PRICE
      )
  }
}

// a workaround to convert the enum from FE to BE
export function convertIngredientsFeToBe(ingredients: Ingredient[]): IngredientBE[] {
  return ingredients.map(ing => {
    // Step 1: Find the key in the Ingredient enum where the value matches the string `ing`.
    const key = Object.keys(Ingredient).find(k => Ingredient[k as keyof typeof Ingredient] === ing);
    // Step 2: If a matching key is found, use it to get the corresponding value from IngredientBE.
    return key ? IngredientBE[key as keyof typeof IngredientBE] : null;
  }).filter(ingredient => ingredient !== null) as IngredientBE[];
}

