import { Ingredient } from "../enums/ingredients.enum"
import { PizzaSize } from "../enums/pizza-size.enum"

export interface Pizza {
  id: number
  name: string
  price: number
  description: string
  size?: PizzaSize
  image: string
  ingredients: Ingredient[]
}
