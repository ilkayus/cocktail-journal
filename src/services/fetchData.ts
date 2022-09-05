const fetchData = async (fetchCategory: string, fetchId: string) => {
  if (fetchId === undefined || fetchId === null || fetchId === "")
    return "Failed to fetch. Fetch id was missing.";
  if (fetchId.indexOf("/")) fetchId = fetchId.replace("/", "+");
  const response = await fetch(
    `https://cocktail-journal-server.herokuapp.com/api/v1/${fetchCategory}/${fetchId}`
    // `http://127.0.0.1:9000/api/v1/${fetchCategory}/${fetchId}`
  );
  const data = await response.json();
  if (!data) return "No results found.";
  return data;
};

const fetchSearchData = async (
  type: string | undefined,
  category: string | undefined,
  ingredients: string[] | undefined
) => {
  console.log(type, category, ingredients);
  if (category?.indexOf("/")) category = category.replace("/", "+");
  const response = await fetch(
    `https://cocktail-journal-server.herokuapp.com/api/v1/search/${type}/${category}/${ingredients?.join(
      // `http://127.0.0.1:9000/api/v1/search/${type}/${category}/${ingredients?.join(
      ","
    )}`
  );
  const data = await response.json();
  if (!data) return "No results found.";
  return data;
};

export { fetchData, fetchSearchData };
