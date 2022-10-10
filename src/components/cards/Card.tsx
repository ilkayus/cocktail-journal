// import { log } from "console";
import { useContext, useState, useEffect } from "react";
import cocktailAPI from "services";
import UserContext from "contextAPI/UserContext";
import { icons } from "img";
import Components from "components";

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

  const categoryClick = async (event: any) => {
    await cocktailAPI.fetchCocktailDataAndRender(
      "category",
      event.target.textContent,
      undefined,
      setCocktailData,
      setPageNumber
    );
  };

  const handleListClick = async (event: any) => {
    if (!event.target.dataset.ingredient) return;
    await cocktailAPI.fetchCocktailDataAndRender(
      "category",
      event.target.textContent,
      undefined,
      setCocktailData,
      setPageNumber
    );
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
    if (user) renderComments();
  };

  const renderComments = () => {
    cocktailAPI.userAction.getComments(_id, user?.token).then((data) =>
      setComments(
        data.data.data.coms.map((el: any, index: any) => {
          return (
            <Components.Comment
              key={index}
              username={el.username}
              userPhoto={el.userPhoto ? el.userPhoto : undefined}
              commentText={el.commentText}
              createDate={el.createDate}
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
        cocktailAPI.userAction
          .addComment(user.token, _id, comment)
          .then(() => renderComments());
        setComment("");
      }
    }
  };
  const handleCommentButton = () => {
    if (comment.length > 0 && user) {
      cocktailAPI.userAction
        .addComment(user.token, _id, comment)
        .then(() => renderComments());
      setComment("");
    }
  };

  const addToFavs = () => {
    cocktailAPI.userAction.addToFavorites(user?.token, _id, isFavorite);
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
          src={isFavorite ? icons.starYellow : icons.starEmpty}
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
              {ingredients
                .filter((el) => el !== "" && el !== null)
                .map((el, ix) => (
                  <li key={ix} data-ingredient={el}>
                    {ix % 2 === 0 ? "💧" : "🩸"} {el}
                  </li>
                ))}
            </ul>
            <ul className="cocktail-mesurments">
              {ingredients
                .filter((el) => el !== "" && el !== null)
                .map((el, ix) => (
                  <li key={ix}>
                    🧪 {ingMeasure[ix] === null ? "Optional" : ingMeasure[ix]}
                  </li>
                ))}
            </ul>
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
