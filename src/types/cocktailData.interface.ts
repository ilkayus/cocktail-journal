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
  _id: string;
  timesfavorite: number;
  isfavorite: boolean;
}

export interface ISignInForm {
  email: string;
  password: string;
}

export interface ISignUpForm {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}
export interface ISignInResponse {
  _id: string;
  username: string;
  email: string;
  photo?: string;
  status: string;
  token: string;
}
