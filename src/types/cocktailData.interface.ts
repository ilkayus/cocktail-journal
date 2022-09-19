export interface ICocktailData {
  imagePreview: string;
  category: string;
  cocktailName: string;
  instructions: string;
  glass: string;
  isAlcoholic: string;
  ingredients: string[];
  ingMeasure: string[];
  drinkID: string;
}

export interface ISingInForm {
  email: string;
  password: string;
}

export interface ISingUpForm {
  email: string;
  password: string;
  username: string;
}

export interface ISingInResponse {}
