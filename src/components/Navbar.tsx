import React from "react";
import { useNavigate } from "react-router-dom";
import HeaderText from "./Header-text";
import HeaderInput from "./Header-input";
import { fetchData } from "../services/fetchData";
import renderNew from "../services/renderNew";
import AdvancedSearcModal from "./AdvancedSearch";
import advancedSearchIcon from "../img/advanced-search.svg";
import randomIcon from "../img/random-thin.svg";
import enterIcon from "../img/enter-icon.png";
import searchIcon from "../img/search-1.svg";
import loginIcon from "../img/login.png";
export interface Props {
  setRandomClick: any;
  setCocktailData: any;
  setPageNumber: React.Dispatch<React.SetStateAction<[number, number]>>;
}

const Navbar = ({ setRandomClick, setCocktailData, setPageNumber }: Props) => {
  const [advancedSearch, setAdvancedSearch] = React.useState(false);
  const [inputData, setInputData] = React.useState("");

  const navigate = useNavigate();
  const handleAdvancedSearchClick = () => {
    console.log(advancedSearch);
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

  const [isSearch, setIsSearch] = React.useState(true);
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
      {isSearch
        ? HeaderText()
        : HeaderInput(handleChange, inputData, handleSubmit)}
      <div className="navbar--buttons">
        <img
          src={isSearch ? searchIcon : enterIcon}
          alt="search icon"
          className={
            isSearch
              ? "btn--search btn--search-icon btn--navbar"
              : "btn--search btn--enter-icon btn--navbar"
          }
          onClick={handleSearchClick}
        />
        <img
          src={advancedSearchIcon}
          alt="advanced search icon"
          className="btn--advanced-search btn--navbar"
          onClick={handleAdvancedSearchClick}
        />
        <img
          src={randomIcon}
          alt="random icon"
          className="btn--random btn--navbar"
          onClick={randomClick}
        />
        <img
          src={loginIcon}
          alt="login icon"
          className="btn--login btn--navbar"
          onClick={() => navigate("/signin")}
        />
      </div>
      <AdvancedSearcModal
        advancedSearch={advancedSearch}
        handleAdvancedSearchClick={handleAdvancedSearchClick}
        setCocktailData={setCocktailData}
        setPageNumber={setPageNumber}
      />
    </nav>
  );
};

export default Navbar;
