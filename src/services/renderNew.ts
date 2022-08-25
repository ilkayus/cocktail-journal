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

export default renderNew;
