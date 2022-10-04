import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../services/fetchData";
import "../css/signIn.css";
import envelopIcon from "../img/envelop.svg";
import rightArrowIcon from "../img/right-arrow.svg";
import lockOpenIcon from "../img/lock-open.svg";
import UserContext from "../UserContext";
import GoogleSignin from "./googleOauth/GoogleSignin";
import { GoogleOAuthProvider } from "@react-oauth/google";
export interface Props {
  clientId: string;
}

const SignIn = ({ clientId }: Props) => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (user) {
      //   console.log(user);
      navigate("/");
    }
  }, [user]);

  const handleChange = (e: any) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await signIn(form.email, form.password);
    // console.log(res);
    setUser(res);
  };

  return (
    <div className="sign--app">
      <div className="si--container">
        <button className="si--back-homepage" onClick={() => navigate("/")}>
          <img src={rightArrowIcon} alt="homepage icon" />
          <p>Back To The Homepage</p>
        </button>
        <h1 className="si--h1">Sign In </h1>
        <form method="post" className="si--form" onSubmit={handleSubmit}>
          <GoogleOAuthProvider clientId={clientId}>
            <GoogleSignin />
          </GoogleOAuthProvider>
          <label htmlFor="username" className="si--username-label">
            <span className="si--username-envelop-icon">
              <img src={envelopIcon} alt="username icon" />
            </span>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={`si--username-input 
            ${
              form.email.length > 7
                ? "si--username-input-valid"
                : form.email.length > 0
                ? "si--username-input-invalid"
                : ""
            }
            `}
              required
              pattern="^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$"
              value={form.email}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="password" className="si--username-label">
            <span className="si--username-envelop-icon">
              <img src={lockOpenIcon} alt="password icon" />
            </span>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className={`si--username-input 
            ${
              form.password.length > 3
                ? "si--username-input-valid"
                : form.password.length > 0
                ? "si--username-input-invalid"
                : "si--username-input-untouched"
            }
              `}
              pattern="^[A-Za-z0-9\W]{3,}$"
              required
              value={form.password}
              onChange={handleChange}
            />
          </label>
          <button type="submit" className="si--submit-button btn--singIn">
            <p>Sign In</p>
            <img src={rightArrowIcon} alt="sing in submit icon" />
          </button>
          <span className="si--create-account">
            <p>Don't have an account yet?</p>
            <button
              type="button"
              className="si--create-account-btn"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </span>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
