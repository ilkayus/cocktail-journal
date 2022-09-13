import axios from "axios";
import { ICocktailData } from "../types/cocktailData.interface";

const BASE_URL = "https://cocktail-journal-server.herokuapp.com/api/v1/";

export const fetchData = async (
  fetchString: string,
  fetchInfo: string
): Promise<ICocktailData> => {
  console.log(fetchString, fetchInfo, urlBuilder(fetchString, fetchInfo));
  const url = `${BASE_URL}${urlBuilder(fetchString, fetchInfo)}`;
  const response = await axios.get(url);
  return response.data;
};

const urlBuilder = (fetchString: string, fetchInfo: string): string => {
  if (fetchInfo.indexOf("/")) fetchInfo = fetchInfo.replace("/", "+");
  if (fetchString === "homepage") return "";
  if (
    fetchString === "category" ||
    fetchString === "ingredients" ||
    fetchString === "cocktailName"
  ) {
    return `${fetchString}/${fetchInfo}`;
  }
  if (fetchString === "search") {
    const searchString = fetchInfo.split(":");
    return `${fetchString}/${searchString[0]}/${searchString[1]}/${searchString[2]}`;
  }
  return "";
};
