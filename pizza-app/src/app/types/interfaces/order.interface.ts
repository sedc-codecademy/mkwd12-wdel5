import { IngredientBE } from "../enums/ingredients.enum";

export interface OrderBE {
  addressTo: string;
  pizzas: PizzaBE[];
  orderPrice: number;
  description: string
}

export interface Order {
  id: number;
  userId: string;
  addressTo: string;
  pizzas: PizzaBE[];
  orderPrice: number;
  description: string;
  user: {
    username: string;
  }
}

export interface PizzaBE {
  name: string;
  price: number;
  ingredients: IngredientBE[];
  description: string;
}