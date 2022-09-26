import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Card from "./Card";
import Pagination from "./Pagination";
import { fetchData } from "../services/fetchData";
import renderNew from "../services/renderNew";
import { ICocktailData } from "../types/cocktailData.interface";
import Loading from "./Loading";
import NoData from "./NoData";

function Homepage() {
  const [randomClick, setRandomClick] = useState(0);
  const [cocktailData, setCocktailData] = useState<ICocktailData[]>([]);
  const [noData, setNoData] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);
  const [[pageNumber, pageMax], setPageNumber] = useState([1, 1]);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [cards, setCards] = useState<JSX.Element[]>([]);

  useEffect(() => {
    setIsRequesting(true);
    fetchData("homepage", "")
      .then((data) => renderNew(setCocktailData, setPageNumber, data))
      .finally(() => setIsRequesting(false));
  }, [randomClick]);

  useEffect(() => {
    //   console.log(cocktailData);
    const cardsData = pageHandler(cocktailData, pageNumber);
    const ids = new Set<string | null>();
    cardsData.map((item: any) => ids.add(item.drinkID));
    if (cardsData.length === 0) setNoData(true);
    else {
      setNoData(false);
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
    }
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
      {noData && !isRequesting ? <NoData setNoData={setNoData} /> : null}
      <div className="card-container">{isRequesting ? <Loading /> : cards}</div>
      <div className="pagination--container">
        {isRequesting ? null : (
          <Pagination
            setPageNumber={setPageNumber}
            pageInfo={[pageNumber, pageMax]}
          />
        )}
      </div>
    </div>
  );
}

export default Homepage;
