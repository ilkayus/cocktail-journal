import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import Pagination from "./components/Pagination";
import { fetchData } from "./services/fetchData";
import renderNew from "./services/renderNew";
import { ICocktailData } from "./types/cocktailData.interface";
import Loading from "./components/Loading";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
// import AdvancedSearcModal from "./components/AdvancedSearch";
// import cocktailObject from "./data/cocktailData.json";

function App() {
  // const [advancedSearch, setAdvancedSearch] = useState(false);
  const [randomClick, setRandomClick] = useState(0);
  const [cocktailData, setCocktailData] = useState<ICocktailData[]>([]);
  const [[pageNumber, pageMax], setPageNumber] = useState([1, 1]);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [cards, setCards] = useState<JSX.Element[]>([]);

  useEffect(() => {
    fetchData("homepage", "").then((data) =>
      renderNew(setCocktailData, setPageNumber, data)
    );
  }, [randomClick]);

  useEffect(() => {
    const cardsData = pageHandler(cocktailData, pageNumber);
    const ids = new Set<string | null>();
    cardsData.map((item: any) => ids.add(item.drinkID));
    if (!ids.has(selectedCard) && selectedCard) setSelectedCard(null);
    setCards(
      cardsData.map((item: any) => {
        return (
          <Card
            key={item.drinkID}
            {...item}
            setCocktailData={setCocktailData}
            setPageNumber={setPageNumber}
            setSelectedCard={setSelectedCard}
            selectedCard={selectedCard}
          />
        );
      })
    );
  }, [cocktailData, pageNumber, selectedCard]);

  const pageHandler = (data: any, page: number) => {
    return data.slice(page * 3 - 3, page * 3);
  };
  // {/* <div className="App"> */}
  // {/* </div> */}

  return (
    <Routes>
      <Route
        path="/signin"
        element={
          <div className="sign--app">
            <SignIn />
          </div>
        }
      />
      <Route
        path="/signup"
        element={
          <div className="sign--app">
            <SignUp />
          </div>
        }
      />
      <Route
        path="/"
        element={
          <>
            <div className="App">
              <Navbar
                setRandomClick={setRandomClick}
                setCocktailData={setCocktailData}
                setPageNumber={setPageNumber}
              />
              <div className="card-container">
                {cards.length > 0 ? cards : <Loading />}
              </div>
              <div className="pagination--container">
                {cards.length > 0 ? (
                  <Pagination
                    setPageNumber={setPageNumber}
                    pageInfo={[pageNumber, pageMax]}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </>
        }
      ></Route>
    </Routes>
  );
}

export default App;
