import axios from "axios";
import {
  ICocktailData,
  ISignInResponse,
} from "../../types/cocktailData.interface";
import { urlHelper } from "../../helpers";

const fetchCocktailData = async (
  fetchString: string,
  fetchInfo: string,
  user?: ISignInResponse | undefined
): Promise<ICocktailData> => {
  const config = CheckUser(user);
  const url = `${urlHelper.BASE_URL}${urlHelper.fetchCocktailDataUrlBuilder(
    fetchString,
    fetchInfo
  )}`;
  //  console.log(url);
  const response = await axios.get(url, config);
  return response.data;
};
//-----------------------------------------------
const CheckUser = (user: ISignInResponse | undefined): any => {
  const config = user
    ? {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      }
    : {};
  return config;
};
//-----------------------------------------------

//-----------------------------------------------

export default fetchCocktailData;
