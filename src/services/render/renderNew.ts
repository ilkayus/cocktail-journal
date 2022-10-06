import fetchCocktailData from "services/cocktailAPI/cocktailData";
import { ISignInResponse } from "types/cocktailData.interface";

const fetchCocktailDataAndRender = async (
  fetchString: string,
  fetchInfo: string,
  user: ISignInResponse | undefined,
  setCocktailData: any,
  setPageNumber: React.Dispatch<React.SetStateAction<[number, number]>>,
  message?: string
) => {
  const data = await fetchCocktailData(fetchString, fetchInfo, user);
  renderNew(setCocktailData, setPageNumber, data, message);
};

const renderNew = (
  setCocktailData: any,
  setPageNumber: React.Dispatch<React.SetStateAction<[number, number]>>,
  data: any,
  message?: string
) => {
  try {
    setCocktailData(data.data.cocks);
    setPageNumber(([prev, maxPrev]) => [
      1,
      Math.ceil(data.data.cocks.length / 3),
    ]);
  } catch (error: any) {
    console.log(message, error.message);
  }
};

export default fetchCocktailDataAndRender;
