export enum Ingredient {
  TOMATO_SAUCE = 'TOMATO SAUCE',
  MOZZARELLA = 'MOZZARELLA',
  HAM = 'HAM',
  OREGANO = 'OREGANO',
  GARLIC = 'GARLIC',
  ONION = 'ONION',
  MUSHROOMS = 'MUSHROOMS',
  PARMESAN = 'PARMESAN',
  BASIL = 'BASIL',
  PEPPERONI = 'PEPPERONI',
  EGG = 'EGG',
  CHILLI_PEPPER = 'CHILLI PEPPER',
  SOUR_CREAM = 'SOUR CREAM',
  BACON = 'BACON',
  BLUE_CHEESE = 'BLUE CHEESE',
  GORGONZOLA = 'GORGONZOLA',
  TUNA = 'TUNA',
  OLIVES = 'OLIVES'
}

// we need this because when we send the value of the enum to the server, it is the number of the enum by which it is identified, not the string, like in the Ingredient enum
// so the value for the TOMATO_SAUCE will be 0, for the MOZZARELLA will be 1 etc.
export enum IngredientBE {
  TOMATO_SAUCE,
  MOZZARELLA,
  HAM,
  OREGANO,
  GARLIC,
  ONION,
  MUSHROOMS,
  PARMESAN,
  BASIL,
  PEPPERONI,
  EGG,
  CHILLI_PEPPER,
  SOUR_CREAM,
  BACON,
  BLUE_CHEESE,
  GORGONZOLA,
  TUNA,
  OLIVES
}