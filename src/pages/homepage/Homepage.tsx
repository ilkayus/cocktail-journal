import { useState, useEffect } from "react";
import cocktailAPI from "services";
import { ICocktailData } from "types/cocktailData.interface";
import Components from "components";

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
    cocktailAPI
      .fetchCocktailDataAndRender(
        "homepage",
        "",
        undefined,
        setCocktailData,
        setPageNumber
      )
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
            <Components.Card
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
      <Components.Navbar
        setRandomClick={setRandomClick}
        setCocktailData={setCocktailData}
        setPageNumber={setPageNumber}
      />
      {noData && !isRequesting ? (
        <Components.NoData setNoData={setNoData} />
      ) : null}
      <div className="card-container">
        {isRequesting ? <Components.Loading /> : cards}
      </div>
      <div className="pagination--container">
        {isRequesting ? null : (
          <Components.Pagination
            setPageNumber={setPageNumber}
            pageInfo={[pageNumber, pageMax]}
          />
        )}
      </div>
    </div>
  );
}

export default Homepage;
