import React from "react";
import HeaderText from "./Header-text";
import HeaderInput from "./Header-input";
import fetchData from "../services/fetchData";
import renderNew from "../services/renderNew";
import AdvancedSearcModal from "./AdvancedSearch";
export interface Props {
  setRandomClick: any;
  setCocktailData: any;
  setPageNumber: React.Dispatch<React.SetStateAction<[number, number]>>;
}

const Navbar = ({ setRandomClick, setCocktailData, setPageNumber }: Props) => {
  const [advancedSearch, setAdvancedSearch] = React.useState(false);
  const [inputData, setInputData] = React.useState("");

  const handleAdvancedSearchClick = () => {
    console.log(advancedSearch);
    setAdvancedSearch((prev) => !prev);
  };

  const handleChange = (event: any) => {
    setInputData(event.target.value);
  };

  const searchResults = async (searchText: string) => {
    const data = await fetchData("cocktailName", searchText);
    renderNew(setCocktailData, setPageNumber, data);
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
      ;
      <div className="navbar--buttons">
        <img
          src={isSearch ? "./img/search-1.svg" : "./img/enter-icon.png"}
          alt="search icon"
          className={
            isSearch
              ? "btn--search btn--search-icon btn--navbar"
              : "btn--search btn--enter-icon btn--navbar"
          }
          onClick={handleSearchClick}
        />
        <img
          src="./img/advanced-search.svg"
          alt="advanced search icon"
          className="btn--advanced-search btn--navbar"
          onClick={handleAdvancedSearchClick}
        />
        <img
          src="./img/random-thin.svg"
          alt="random icon"
          className="btn--random btn--navbar"
          onClick={randomClick}
        />
      </div>
      <AdvancedSearcModal
        advancedSearch={advancedSearch}
        handleAdvancedSearchClick={handleAdvancedSearchClick}
      />
    </nav>
  );
};

export default Navbar;
