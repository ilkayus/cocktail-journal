import { useState } from "react";
import "../css/signIn.css";
import googleIcon from "../img/google.svg";
import envelopIcon from "../img/envelop.svg";
import rightArrowIcon from "../img/right-arrow.svg";
import lockOpenIcon from "../img/lock-open.svg";

export interface Props {
  //   setLoggedIn: boolean;
  //   setSignUp: any;
}

const SignIn = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [response, setResponse] = useState({
    open: false,
    success: true,
    message: "",
  });

  const handleChange = (e: any) => {
    if (response.open) {
      setResponse((prev) => ({
        ...prev,
        open: false,
      }));
    }
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {};

  return (
    <div className="si--container">
      <h1 className="si--h1">Sign In 🎭</h1>
      <form
        method="post"
        className="grid gap-2 mt-5"
        // autoCapitalize={false}
        onSubmit={handleSubmit}
      >
        <div className="si--with--google--container">
          <button type="button" className="si--with--google-button btn--singIn">
            <span className="si--with--google-icom">
              <img src={googleIcon} alt="google icom" />
            </span>
            <p>Sign in with Google</p>
          </button>
          <div className="si--or">
            <p> ---- or ---- </p>
          </div>
        </div>
        <label htmlFor="username" className="">
          <input
            type="text"
            className={`si--username-input 
                ${
                  form.username.length > 8
                    ? "si--username-input-valid"
                    : form.username.length > 0
                    ? "si--username-input-invalid"
                    : "si--username-input-untouched"
                }
              `}
            required
            pattern="^[@a-z0-9._]{8,}$"
            value={form.username}
            onChange={handleChange}
          />
          <span className="si--username-envelop-icon">
            <img src={envelopIcon} alt="username icon" />
          </span>
          <span
            className={`si--username-placeholder 
            ${form.username.length > 0 && "si--username-placeholder-transform"}
              `}
          >
            Username or Email
          </span>
        </label>
        <label htmlFor="password" className="">
          <input
            type="password"
            className={`si--username-password 
            ${
              form.username.length > 3
                ? "si--username-password-valid"
                : form.username.length > 0
                ? "si--username-password-invalid"
                : "si--username-password-untouched"
            }
          `}
            pattern="^[A-Za-z0-9\W]{3,}$"
            required
            value={form.password}
            onChange={handleChange}
          />
          <span className="si--password-lock-icon">
            <img src={lockOpenIcon} alt="password icon" />
          </span>
          <span
            className={`si--password-placeholder 
            ${form.username.length > 0 && "si--password-placeholder-transform"}
              `}
          >
            Password
          </span>
        </label>
        <button type="submit" className="si--submit-button btn--singIn">
          <p className="si--singIn-text">Sign In</p>
          <img src={rightArrowIcon} alt="sing in submit icon" />
        </button>
        <span className="si--create-account">
          <p>Don't have an account yet?</p>
          <button
            type="button"
            className="si--create-account-btn"
            // onClick={() => setSignUp(true)}
          >
            Sign Up
          </button>
        </span>
      </form>
    </div>
  );
};

export default SignIn;
