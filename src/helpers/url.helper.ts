// const BASE_URL = "http://localhost:9000/api/v1/";
const BASE_URL = "https://cocktail-journal-server-ilkayus.vercel.app/api/v1";
// const BASE_URL = "https://cocktail-journal-server.herokuapp.com/api/v1/";
// const BASE_URL =
//   process.env.ENV === "development"
//     ? "http://localhost:9000/api/v1/"
//     : "https://cocktail-journal-server.herokuapp.com/api/v1/";

const fetchCocktailDataUrlBuilder = (
  fetchString: string,
  fetchInfo: string
): string => {
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
  if (fetchString === "favorites") return "favorites";
  return "";
};

export { fetchCocktailDataUrlBuilder, BASE_URL };
