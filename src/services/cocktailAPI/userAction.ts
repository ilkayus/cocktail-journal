import axios from "axios";
import { urlHelper } from "../../helpers";

const setHeader = (token: string | undefined): any => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  return config;
};

const addToFavorites = async (
  token: string | undefined,
  id: string,
  isFav: boolean
) => {
  const addRemove = isFav ? "removefavs" : "addfavs";
  const url = `${urlHelper.BASE_URL}${addRemove}/${id}`;
  // console.log(url);
  const response = await axios.patch(url, {}, setHeader(token));
  //console.log(response);
  return response;
};

const getComments = async (id: string, token: string | undefined) => {
  const url = `${urlHelper.BASE_URL}comments/${id}`;
  const response = await axios.get(url, setHeader(token));
  //console.log(response);
  return response;
};

const addComment = async (
  token: string | undefined,
  id: string,
  comment: string
) => {
  const url = `${urlHelper.BASE_URL}addcomment/${id}`;
  //  console.log(url);
  const response = await axios.post(
    url,
    { data: comment, createDate: new Date() },
    setHeader(token)
  );
  //  console.log(response);
  return response;
};

const removeComment = async (token: string | undefined, id: string) => {
  const url = `${urlHelper.BASE_URL}removecomment/${id}`;
  const response = await axios.delete(url, setHeader(token));
  // console.log(response);
  return response;
};

export { addToFavorites, addComment, removeComment, getComments };
