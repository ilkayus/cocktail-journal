import fetchCocktailDataAndRender from "services/render/renderNew";
import fetchCocktailData from "services/cocktailAPI/cocktailData";
import * as authorization from "services/cocktailAPI/authorization";
import * as userAction from "services/cocktailAPI/userAction";

const cocktailAPI = {
  fetchCocktailDataAndRender,
  fetchCocktailData,
  authorization,
  userAction,
};

export default cocktailAPI;
