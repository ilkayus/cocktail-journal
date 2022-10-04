import axios from "axios";
import {
  ICocktailData,
  ISignInResponse,
} from "../types/cocktailData.interface";

//const BASE_URL = "http://localhost:9000/api/v1/";
const BASE_URL = "https://cocktail-journal-server.herokuapp.com/api/v1/";
// const BASE_URL =
//   process.env.ENV === "development"
//     ? "http://localhost:9000/api/v1/"
//     : "https://cocktail-journal-server.herokuapp.com/api/v1/";

const fetchData = async (
  fetchString: string,
  fetchInfo: string,
  user?: ISignInResponse | undefined
): Promise<ICocktailData> => {
  const config = CheckUser(user);
  const url = `${BASE_URL}${urlBuilder(fetchString, fetchInfo)}`;
  //  console.log(url);
  const response = await axios.get(url, config);
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
  if (fetchString === "favorites") return "favorites";
  return "";
};

const signIn = async (
  email: string,
  password: string
): Promise<ISignInResponse> => {
  const url = `${BASE_URL}users/signin`;
  const response = await axios.post(url, {
    email: email,
    password: password,
  });
  return response.data;
};

const signUp = async (
  email: string,
  username: string,
  password: string,
  passwordConfirm: string
): Promise<ISignInResponse> => {
  const url = `${BASE_URL}users/signup`;
  const response = await axios.post(url, {
    email: email,
    username: username,
    password: password,
    passwordConfirm: passwordConfirm,
  });
  return response.data;
};

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
  const url = `${BASE_URL}${addRemove}/${id}`;
  // console.log(url);
  const response = await axios.patch(url, {}, setHeader(token));
  // console.log(response);
  return response;
};

const getComments = async (id: string, token: string | undefined) => {
  const url = `${BASE_URL}comments/${id}`;
  const response = await axios.get(url, setHeader(token));
  //  console.log(response);
  return response;
};

const addComment = async (
  token: string | undefined,
  id: string,
  comment: string
) => {
  const url = `${BASE_URL}addcomment/${id}`;
  //  console.log(url);
  const response = await axios.post(url, { data: comment }, setHeader(token));
  //  console.log(response);
  return response;
};

const removeComment = async (token: string | undefined, id: string) => {
  const url = `${BASE_URL}removecomment/${id}`;
  const response = await axios.delete(url, setHeader(token));
  // console.log(response);
  return response;
};

const googleOAuthGetId = async () => {
  const url = `${BASE_URL}users/googleOAuth`;
  const response = await axios.get(url);
  return response;
};

const signInWithGoogleOAuth = async (
  email: string,
  username: string,
  picture: string,
  password: string
) => {
  const url = `${BASE_URL}users/signInWithGoogleOAuth`;
  const response = await axios.post(url, {
    email: email,
    username: username,
    photo: picture,
    password: password,
    passwordConfirm: password,
  });
  return response.data;
};

export {
  fetchData,
  signIn,
  signUp,
  addToFavorites,
  addComment,
  removeComment,
  getComments,
  googleOAuthGetId,
  signInWithGoogleOAuth,
};
