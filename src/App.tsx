import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ISignInResponse } from "./types/cocktailData.interface";
import Pages from "./pages";
import UserContext from "./contextAPI/UserContext";
import cocktailAPI from "./services";

function App() {
  const [user, setUser] = useState<ISignInResponse>();
  const [clientId, setClientId] = useState("");
  useEffect(() => {
    cocktailAPI.authorization.googleOAuthGetId().then((response) => {
      setClientId(response.data.clientId);
    });
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/" element={<Pages.Homepage />} />
        <Route path="/cocktail-journal" element={<Pages.Homepage />} />
        <Route path="/signin" element={<Pages.SignIn clientId={clientId} />} />
        <Route path="/signup" element={<Pages.SignUp clientId={clientId} />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
