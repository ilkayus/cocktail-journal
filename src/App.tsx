import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./components/Homepage";
import { ISignInResponse } from "./types/cocktailData.interface";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import UserContext from "./UserContext";
import { googleOAuthGetId } from "./services/fetchData";

function App() {
  const [user, setUser] = useState<ISignInResponse>();
  const [clientId, setClientId] = useState("");
  useEffect(() => {
    googleOAuthGetId().then((response) => {
      setClientId(response.data.clientId);
    });
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/cocktail-journal" element={<Homepage />} />
        <Route path="/signin" element={<SignIn clientId={clientId} />} />
        <Route path="/signup" element={<SignUp clientId={clientId} />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
