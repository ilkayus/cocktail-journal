import axios from "axios";
import { ISignInResponse } from "../../types/cocktailData.interface";
import { urlHelper } from "../../helpers";

const signIn = async (
  email: string,
  password: string
): Promise<ISignInResponse> => {
  const url = `${urlHelper.BASE_URL}users/signin`;
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
  const url = `${urlHelper.BASE_URL}users/signup`;
  const response = await axios.post(url, {
    email: email,
    username: username,
    password: password,
    passwordConfirm: passwordConfirm,
  });
  return response.data;
};

const googleOAuthGetId = async () => {
  const url = `${urlHelper.BASE_URL}users/googleOAuth`;
  const response = await axios.get(url);
  return response;
};

const signInWithGoogleOAuth = async (
  email: string,
  username: string,
  picture: string,
  password: string
) => {
  const url = `${urlHelper.BASE_URL}users/signInWithGoogleOAuth`;
  const response = await axios.post(url, {
    email: email,
    username: username,
    photo: picture,
    password: password,
    passwordConfirm: password,
  });
  return response.data;
};

export { signIn, signUp, googleOAuthGetId, signInWithGoogleOAuth };
