import React from "react";
export interface Props {
  setRandomClick: any;
  setCocktailData: any;
  setPageNumber: React.Dispatch<React.SetStateAction<[number, number]>>;
}

const Navbar = ({ setRandomClick, setCocktailData, setPageNumber }: Props) => {
  const fetchData = async (fetchId: string) => {
    if (fetchId === undefined || fetchId === null || fetchId === "") return;
    const response = await fetch(
      `http://127.0.0.1:9000/api/v1/cocktailName/${fetchId}`
    );
    const data = await response.json();
    console.log("in navbar search: ", data);
    if (!data.results) return alert("No results found");
    setCocktailData(data.data.cocks);
    setPageNumber(([prev, maxPrev]) => [
      1,
      Math.ceil(data.data.cocks.length / 3),
    ]);
  };

  const trueState: JSX.Element = (
    <h1 className="navbar-header">🍸🍹🍷 The Cocktail Journal.</h1>
  );
  const [inputData, setInputData] = React.useState("");
  const handleChange = (event: any) => {
    setInputData(event.target.value);
  };
  const handleSubmit = (event: any) => {
    if (event.key === "Enter") {
      fetchData(inputData);
      setInputData("");
      setIsSearch(true);
    }
  };

  const falseState: JSX.Element = (
    <input
      type="search"
      className="search-input"
      placeholder="  What are you looking for?"
      onChange={handleChange}
      value={inputData}
      onKeyDown={handleSubmit}
      autoFocus
    />
  );
  const [isSearch, setIsSearch] = React.useState(true);
  const handleSearchClick = () => {
    console.log(isSearch);
    if (!isSearch) {
      fetchData(inputData);
      setInputData("");
    }
    setIsSearch(!isSearch);
  };
  const randomClick = () => {
    setRandomClick((prev: any) => prev + 1);
  };
  return (
    <nav className="navbar">
      {isSearch ? trueState : falseState}
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
          src="./img/random-thin.svg"
          alt="random icon"
          className="btn--random btn--navbar"
          onClick={randomClick}
        />
      </div>
    </nav>
  );
};

export default Navbar;
