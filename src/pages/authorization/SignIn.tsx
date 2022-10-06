import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { signIn } from "../../services/fetchData";
import "./authorization.style.css";
import Components from "components";
import { icons } from "../../img/index";
import UserContext from "../../contextAPI/UserContext";

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
          <img src={icons.rightArrow} alt="homepage icon" />
          <p>Back To The Homepage</p>
        </button>
        <h1 className="si--h1">Sign In </h1>
        <form method="post" className="si--form" onSubmit={handleSubmit}>
          <GoogleOAuthProvider clientId={clientId}>
            <Components.GoogleSignin />
          </GoogleOAuthProvider>
          <label htmlFor="username" className="si--username-label">
            <span className="si--username-envelop-icon">
              <img src={icons.envelop} alt="username icon" />
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
              <img src={icons.lockOpen} alt="password icon" />
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
            <img src={icons.rightArrow} alt="sing in submit icon" />
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
