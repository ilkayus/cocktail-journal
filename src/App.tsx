import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./components/Homepage";
import { ICocktailData, ISignInResponse } from "./types/cocktailData.interface";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import UserContext from "./UserContext";

function App() {
  const [user, setUser] = useState<ISignInResponse>();
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/cocktail-journal" element={<Homepage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
