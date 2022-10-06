import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { signInWithGoogleOAuth } from "../../services/fetchData";
import axios from "axios";
import { icons } from "../../img/index";
import UserContext from "../../contextAPI/UserContext";

const GoogleSignin = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      // console.log(user);
      navigate("/");
    }
  }, [user]);

  const getUserInfo = async (data: any) => {
    const url = `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${data.access_token}`;
    const response = await axios.get(url);
    const res = await signInWithGoogleOAuth(
      response.data.email,
      response.data.name,
      response.data.picture,
      response.data.sub
    );
    setUser(res);
  };
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => getUserInfo(tokenResponse),
  });
  return (
    <div>
      <button
        type="button"
        className="si--with--google-button btn--singIn"
        onClick={() => login()}
      >
        <span className="si--with--google-icon">
          <img src={icons.google} alt="google icon" />
        </span>
        <p>Sign in with Google</p>
      </button>
      <div className="si--google-or">
        <span className="si--google-or-dash"></span>
        <p>or</p>
        <span className="si--google-or-dash"></span>
      </div>
    </div>
  );
};

export default GoogleSignin;
