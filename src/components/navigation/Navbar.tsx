import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../services/fetchData";
import renderNew from "../../services/renderNew";
import Components from "components";
import { icons } from "../../img/index";
import UserContext from "../../contextAPI/UserContext";

export interface Props {
  setRandomClick: any;
  setCocktailData: any;
  setPageNumber: React.Dispatch<React.SetStateAction<[number, number]>>;
}

const Navbar = ({ setRandomClick, setCocktailData, setPageNumber }: Props) => {
  const [advancedSearch, setAdvancedSearch] = useState(false);
  const [inputData, setInputData] = useState("");
  const [isSearch, setIsSearch] = useState(true);
  const { user, setUser } = useContext(UserContext);

  const signOutUser = () => setUser(undefined);
  const getUserFavs = () => {
    fetchData("favorites", "", user).then((data) =>
      renderNew(setCocktailData, setPageNumber, data)
    );
  };
  const signInOutButton = user ? (
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

  const navigate = useNavigate();
  const handleAdvancedSearchClick = () => {
    setAdvancedSearch((prev) => !prev);
  };

  const handleChange = (event: any) => {
    setInputData(event.target.value);
  };
  const searchResults = async (searchText: string) => {
    fetchData("cocktailName", searchText).then((data) =>
      renderNew(setCocktailData, setPageNumber, data)
    );
  };

  const handleSubmit = (event: any) => {
    if (event.key === "Enter") {
      searchResults(inputData);
      setInputData("");
      setIsSearch(true);
    }
  };

  const handleSearchClick = () => {
    if (!isSearch) {
      searchResults(inputData);
      setInputData("");
    }
    setIsSearch(!isSearch);
  };

  const randomClick = () => {
    setRandomClick((prev: any) => prev + 1);
  };
  return (
    <nav className="navbar">
      {isSearch ? (
        <Components.HeaderText />
      ) : (
        <Components.HeaderInput
          handleChange={handleChange}
          inputData={inputData}
          handleSubmit={handleSubmit}
        />
      )}
      <div className="navbar--buttons">
        <img
          src={isSearch ? icons.search : icons.enter}
          alt="search icon"
          className={
            isSearch
              ? "btn--search btn--search-icon btn--navbar"
              : "btn--search btn--enter-icon btn--navbar"
          }
          onClick={handleSearchClick}
        />
        <img
          src={icons.advancedSearc}
          alt="advanced search icon"
          className="btn--advanced-search btn--navbar"
          onClick={handleAdvancedSearchClick}
        />
        <img
          src={icons.random}
          alt="random icon"
          className="btn--random btn--navbar"
          onClick={randomClick}
        />
        {signInOutButton}
      </div>
      <Components.AdvancedSearcModal
        advancedSearch={advancedSearch}
        handleAdvancedSearchClick={handleAdvancedSearchClick}
        setCocktailData={setCocktailData}
        setPageNumber={setPageNumber}
      />
    </nav>
  );
};

export default Navbar;
