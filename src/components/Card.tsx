import { useState } from "react";
import fetchData from "../services/fetchData";
import renderNew from "../services/renderNew";

export interface Props {
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
  setSelectedCard: React.Dispatch<React.SetStateAction<string>>;
  drinkID: string;
  selectedCard: string;
}

const Card = ({
  imagePreview,
  category,
  cocktailName,
  instructions,
  glass,
  isAlcoholic,
  ingredients,
  ingMeasure,
  setCocktailData,
  setPageNumber,
  setSelectedCard,
  selectedCard,
  drinkID,
}: Props) => {
  let ingredientList: JSX.Element[] = [];
  let meausermentList: JSX.Element[] = [];
  for (let i = 0; i < 15; i++) {
    if (ingredients[i] === null || ingredients[i] === "") i = 15;
    else {
      const ingIcon = i % 2 === 0 ? "💧" : "🩸";
      ingredientList.push(
        <li data-ingredient={ingredients[i]}>
          {ingIcon} {ingredients[i]}
        </li>
      );
      meausermentList.push(
        <li>🧪 {ingMeasure[i] === null ? "Optional" : ingMeasure[i]}</li>
      );
    }
  }
  const categoryClick = async (event: any) => {
    const data = await fetchData("category", event.target.textContent);
    renderNew(setCocktailData, setPageNumber, data);
  };

  const handleListClick = async (event: any) => {
    if (!event.target.dataset.ingredient) return;
    const data = await fetchData(
      "ingredients",
      event.target.dataset.ingredient
    );
    renderNew(setCocktailData, setPageNumber, data);
  };

  const [cardAnimation, setCardAnimation] = useState("");
  const addAnimation = (event: any) => {
    setCardAnimation((prev) => (prev === "" ? "cocktail-card-animation" : ""));
    console.log(event);
  };

  const animation = selectedCard === drinkID ? "cocktail-card-animation" : "";

  return (
    <figure
      className={"cocktail-card " + animation}
      onClick={() => {
        setSelectedCard(drinkID);
      }}
    >
      <div className="cocktail-image-container">
        <img
          src={imagePreview}
          alt="cocktail thumbnail"
          className="cocktail-image"
        />
      </div>
      <div className="cocktail-info-side">
        <h3 className="cocktail-category" onClick={categoryClick}>
          {category}
        </h3>
        <h3 className="cocktail-name">{cocktailName}</h3>
        <p className="cocktail-description">{instructions}</p>
        <div className="cocktail-ingredients-side">
          <ul className="cocktail-ingredients" onClick={handleListClick}>
            {ingredientList}
          </ul>
          <ul className="cocktail-mesurments">{meausermentList}</ul>
        </div>
        <div className="cocktail--details">
          <p className="cocktail--glass">
            <span className="emoji">🍸</span>
            {glass}
          </p>
          <p className="cocktail--fuel">
            <span className="emoji">⛽</span>
            {isAlcoholic}
          </p>
        </div>
      </div>
    </figure>
  );
};

export default Card;
