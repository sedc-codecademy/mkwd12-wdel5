import { IngredientBE } from "../enums/ingredients.enum";

export interface OrderBE {
  addressTo: string;
  pizzas: PizzaBE[];
  orderPrice: number;
  description: string
}

export interface PizzaBE {
  name: string;
  price: number;
  ingredients: IngredientBE;
  description: string
}