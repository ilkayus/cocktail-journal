import { responsiveFontSizes } from "@mui/material";
import axios from "axios";
import {
  ICocktailData,
  ISignInForm,
  ISignInResponse,
} from "../types/cocktailData.interface";

// const BASE_URL = "https://cocktail-journal-server.herokuapp.com/api/v1/";
const BASE_URL = "http://localhost:9000/api/v1/";

const fetchData = async (
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

const signIn = async (
  email: string,
  password: string
): Promise<ISignInResponse> => {
  console.log("signIn", email, password);
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
  confirmPassword: string
): Promise<ISignInResponse> => {
  console.log("signUp", username, email, password, confirmPassword);
  const url = `${BASE_URL}users/signup`;
  const response = await axios.post(url, {
    email: email,
    username: username,
    password: password,
    confirmPassword: confirmPassword,
  });
  return response.data;
};

export { fetchData, signIn, signUp };
