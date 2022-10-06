import React from "react";
import { ISignInResponse } from "../types/cocktailData.interface";

type UserContextType = {
  user: ISignInResponse | undefined;
  setUser: React.Dispatch<React.SetStateAction<ISignInResponse | undefined>>;
};

const IUserContextState = {
  user: undefined,
  setUser: () => {},
};

const UserContext = React.createContext<UserContextType>(IUserContextState);

export default UserContext;
