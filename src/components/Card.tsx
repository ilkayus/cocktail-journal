import { useState } from "react";

export interface Props {
  key: string;
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
}

const Card = ({
  key,
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
}: Props) => {
  const fetchData = async (fetchCategory: string, fetchId: string) => {
    if (fetchId === undefined || fetchId === null || fetchId === "") return;
    if (fetchId.includes("/")) fetchId = fetchId.replace("/", "+");
    const response = await fetch(
      `http://127.0.0.1:9000/api/v1/${fetchCategory}/${fetchId}`
    );
    const data = await response.json();
    console.log("in category click  search: ", data);
    setCocktailData(data.data.cocks);
    setPageNumber(([prev, maxPrev]) => [
      1,
      Math.ceil(data.data.cocks.length / 3),
    ]);
  };
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
  const categoryClick = (event: any) => {
    console.log(event.target.textContent);
    fetchData("category", event.target.textContent);
  };
  const handleListClick = (event: any) => {
    console.log(event.target.dataset.ingredient);
    if (!event.target.dataset.ingredient) return;
    fetchData("ingredients", event.target.dataset.ingredient);
  };
  const [cardAnimation, setCardAnimation] = useState("");
  const addAnimation = () => {
    setCardAnimation((prev) => (prev === "" ? "cocktail-card-animation" : ""));
  };
  // const removeAnimation = () => {
  //   setCardAnimation("");
  // };
  return (
    <figure
      className={"cocktail-card " + cardAnimation}
      onClick={addAnimation}
      // onMouseOut={removeAnimation}
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
