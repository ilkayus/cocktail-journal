import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import Pagination from "./components/Pagination";
import { fetchData } from "./services/fetchData";
import renderNew from "./services/renderNew";
import { ICocktailData } from "./types/cocktailData.interface";
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

  return (
    <div className="App">
      <Navbar
        setRandomClick={setRandomClick}
        setCocktailData={setCocktailData}
        setPageNumber={setPageNumber}
      />
      <div className="card-container">{cards}</div>
      <div className="pagination--container">
        <Pagination
          setPageNumber={setPageNumber}
          pageInfo={[pageNumber, pageMax]}
        />
      </div>
    </div>
  );
}

export default App;
