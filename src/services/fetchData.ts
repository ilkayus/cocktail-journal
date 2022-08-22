const fetchData = async (fetchCategory: string, fetchId: string) => {
  if (fetchId === undefined || fetchId === null || fetchId === "")
    return "Failed to fetch. Fetch id was missing.";
  if (fetchId.includes("/")) fetchId = fetchId.replace("/", "+");
  const response = await fetch(
    `http://127.0.0.1:9000/api/v1/${fetchCategory}/${fetchId}`
  );
  const data = await response.json();
  if (!data) return "No results found.";
  return data;
};

export default fetchData;
