import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import googleIcon from "../../img/google.svg";

const GoogleSignin = () => {
  const getUserInfo = async (data: any) => {
    console.log(data);
    const url = `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${data.access_token}`;
    const response = await axios.get(url);
    console.log(response);
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
          <img src={googleIcon} alt="google icon" />
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
