import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import Pagination from "./components/Pagination";
// import AdvancedSearcModal from "./components/AdvancedSearch";
// import cocktailObject from "./data/cocktailData.json";

function App() {
  // const [advancedSearch, setAdvancedSearch] = useState(false);
  const [randomClick, setRandomClick] = useState(0);
  const [cocktailData, setCocktailData] = useState([]);
  const [[pageNumber, pageMax], setPageNumber] = useState([1, 1]);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://127.0.0.1:9000/api/v1");
      const data = await response.json();
      console.log("in use effect: ", data);
      setCocktailData(data.data.cocks);
      setPageNumber(([prev, maxPrev]) => [
        1,
        Math.ceil(data.data.cocks.length / 3),
      ]);
    };
    fetchData();
  }, [randomClick]);
  const startDataLength = cocktailData.length;

  console.log("new state:", cocktailData, startDataLength);
  console.log("pagination:", ...[pageNumber, pageMax]);

  const pageHandler = (data: any, page: number) => {
    return data.slice(page * 3 - 3, page * 3);
  };
  const cards: JSX.Element[] = pageHandler(cocktailData, pageNumber).map(
    (item: any) => {
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
    }
  );

  return (
    <div className="App">
      <Navbar
        setRandomClick={setRandomClick}
        setCocktailData={setCocktailData}
        setPageNumber={setPageNumber}
      />
      <div className="card-container">{cards}</div>
      <Pagination
        setPageNumber={setPageNumber}
        pageInfo={[pageNumber, pageMax]}
      />
    </div>
  );
}

export default App;
