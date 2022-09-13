// import { log } from "console";
// import { useState } from "react";
import { fetchData } from "../services/fetchData";
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
  setSelectedCard: React.Dispatch<React.SetStateAction<string | null>>;
  drinkID: string;
  selectedCard: string | null;
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
        <li key={i} data-ingredient={ingredients[i]}>
          {ingIcon} {ingredients[i]}
        </li>
      );
      meausermentList.push(
        <li key={i}>
          🧪 {ingMeasure[i] === null ? "Optional" : ingMeasure[i]}
        </li>
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

  const addAnimation = (event: any) => {
    if (selectedCard === drinkID) {
      setSelectedCard(null);
      console.log("Card animation return");
      return;
    }
    setSelectedCard(drinkID);
    console.log("card animation added");
  };

  const animation =
    selectedCard === drinkID
      ? "cocktail-card-animation"
      : selectedCard
      ? "cocktail-card-animation-hidden"
      : "";

  console.log(drinkID, "drg ID", animation, selectedCard);
  return (
    <figure
      key={drinkID}
      className={"cocktail-card " + animation}
      onClick={addAnimation}
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
