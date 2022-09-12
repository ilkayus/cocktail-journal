export interface ICocktailData {
  imagePreview: string;
  category: string;
  cocktailName: string;
  instructions: string;
  glass: string;
  isAlcoholic: string;
  ingredients: any[];
  ingMeasure: any[];
  setCocktailData: any;
  setPageNumber: React.Dispatch<React.SetStateAction<[number, number]>>;
  setSelectedCard: React.Dispatch<React.SetStateAction<string | null>>;
  drinkID: string;
  selectedCard: string | null;
}
