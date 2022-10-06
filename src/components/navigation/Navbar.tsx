import { useState } from "react";
import cocktailAPI from "services";
import Components from "components";
import { icons } from "img";

export interface Props {
  setRandomClick: any;
  setCocktailData: any;
  setPageNumber: React.Dispatch<React.SetStateAction<[number, number]>>;
}

const Navbar = ({ setRandomClick, setCocktailData, setPageNumber }: Props) => {
  const [advancedSearch, setAdvancedSearch] = useState(false);
  const [inputData, setInputData] = useState("");
  const [isSearch, setIsSearch] = useState(true);

  const handleAdvancedSearchClick = () => {
    setAdvancedSearch((prev) => !prev);
  };

  const handleChange = (event: any) => {
    setInputData(event.target.value);
  };
  const searchResults = async (searchText: string) => {
    cocktailAPI.fetchCocktailDataAndRender(
      "cocktailName",
      searchText,
      undefined,
      setCocktailData,
      setPageNumber
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
        <Components.SignInOutButton
          setCocktailData={setCocktailData}
          setPageNumber={setPageNumber}
        />
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
