import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import cocktailAPI from "services";
import { icons } from "img";
import UserContext from "contextAPI/UserContext";

export interface Props {
  setCocktailData: any;
  setPageNumber: React.Dispatch<React.SetStateAction<[number, number]>>;
}

const SignInOutButton = ({ setPageNumber, setCocktailData }: Props) => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const signOutUser = () => {
    setUser(undefined);
    navigate("/");
  };
  const getUserFavs = () => {
    cocktailAPI.fetchCocktailDataAndRender(
      "favorites",
      "",
      user,
      setCocktailData,
      setPageNumber
    );
  };
  return user ? (
    <>
      <div className="navbar--dropdown">
        <img
          src={user.photo ? user.photo : icons.signed}
          alt="login icon"
          className={`btn--login btn--navbar ${
            user.photo ? "navbar--dropdown--btn" : ""
          }`}
        />
        <ul className="navbar--dropdown-content">
          <li onClick={getUserFavs}>Favorites ⭐</li>
          <li onClick={signOutUser}>Sing Out 👋🏻</li>
        </ul>
      </div>
    </>
  ) : (
    <img
      src={icons.signIn}
      alt="login icon"
      className="btn--login btn--navbar"
      onClick={() => navigate("/signin")}
    />
  );
};

export default SignInOutButton;
