// import { log } from "console";
import { useContext, useState, useEffect } from "react";
import {
  fetchData,
  addToFavorites,
  addComment,
  getComments,
} from "../services/fetchData";
import renderNew from "../services/renderNew";
import UserContext from "../UserContext";
import starIcon from "../img/star.svg";
import starAnimatedIcon from "../img/star-animated.svg";
import Comment from "./Comment";

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
  _id: string;
  favorites: string[] | undefined;
  timesfavorite: number | undefined;
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
  _id,
  favorites,
  timesfavorite,
}: Props) => {
  const [isFavorite, setFavorite] = useState(false);
  const [comments, setComments] = useState<JSX.Element[]>([]);
  const [comment, setComment] = useState("");
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const id = user ? user._id : "";
    setFavorite(!favorites ? false : favorites.includes(id) ? true : false);
  }, []);

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
    if (
      event.target.id === "comment-input" ||
      event.target.parentElement.id === "comment-input"
    )
      return;
    if (event.target.id === "fav-button") {
      return addToFavs();
    }
    if (selectedCard === drinkID) {
      setSelectedCard(null);
      //   console.log("Card animation return");
      return;
    }
    setSelectedCard(drinkID);
    //   console.log("card animation added");
    if (user)
      getComments(_id, user.token).then((data) =>
        setComments(
          data.data.data.coms.map((el: any, index: any) => {
            return (
              <Comment
                key={index}
                username={el.username}
                userPhoto={el.userPhoto ? el.userPhoto : undefined}
                commentText={el.commentText}
              />
            );
          })
        )
      ); //getCommentsSahte();
  };

  const handleCommentInputChange = (event: any) => {
    setComment(event.target.value);
  };
  const handleCommentInputSubmit = (event: any) => {
    if (event.key === "Enter") {
      if (comment.length > 0 && user) {
        addComment(user.token, _id, comment).then((data) => console.log(data));
        setComment("");
      }
    }
  };
  const handleCommentButton = () => {
    if (comment.length > 0 && user) {
      addComment(user.token, _id, comment).then((data) => console.log(data));
      setComment("");
    }
  };

  // const getCommentsSahte = () => {
  //   const arr = new Array(10).fill(0);
  //   console.log(arr);
  //   setComments(
  //     arr.map((el, index) => {
  //       return <Comment key={index} />;
  //     })
  //   );
  //   // console.log(comments);
  // };

  const addToFavs = () => {
    addToFavorites(user?.token, _id, isFavorite);
    setFavorite((prev) => !prev);
    setCocktailData((el: any) => {
      const index = el.findIndex((cock: any) => cock._id === _id);
      console.log(el, index);
      if (el[index].hasOwnProperty(favorites))
        el[index].favorites.push(user?._id);
      else el[index].favorites = [user?._id];
      return el;
    });
  };

  const animation =
    selectedCard === drinkID
      ? "cocktail-card-animation"
      : selectedCard
      ? "cocktail-card-animation-hidden"
      : "";

  //  console.log(drinkID, "drg ID", animation, selectedCard);
  return (
    <figure
      key={drinkID}
      className={"cocktail-card " + animation}
      onClick={addAnimation}
    >
      {user ? (
        <img
          className="cocktail--favorited"
          src={isFavorite ? starAnimatedIcon : starIcon}
          alt="favorited icon"
          id="fav-button"
        />
      ) : null}
      <div className="cocktail-card-content">
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
      </div>
      <div className="cocktail--card--comment-input" id="comment-input">
        <input
          type="text"
          maxLength={140}
          value={comment}
          onChange={handleCommentInputChange}
          onKeyDown={handleCommentInputSubmit}
          placeholder={
            user
              ? "Type Your Comment ..."
              : "Please sign in to write a comment."
          }
        />
        <button
          className={
            "comment--button " +
            (comment.length > 0 && user ? "comment--button--active" : "")
          }
          onClick={handleCommentButton}
        >
          Send
        </button>
      </div>
      <div className="cocktail--card--comments">{comments}</div>
    </figure>
  );
};

export default Card;
