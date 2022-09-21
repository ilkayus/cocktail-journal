import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/signIn.css";
import googleIcon from "../img/google.svg";
import envelopIcon from "../img/envelop.svg";
import userIcon from "../img/user.svg";
import rightArrowIcon from "../img/right-arrow.svg";
import lockOpenIcon from "../img/lock-open.svg";

export interface Props {
  //   setLoggedIn: boolean;
  //   setSignUp: any;
}

const SignUp = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [response, setResponse] = useState({});

  const handleChange = (e: any) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {};

  return (
    <div className="si--container">
      <h1 className="si--h1">Sign Up </h1>
      <form
        method="post"
        className="si--form"
        // autoCapitalize={false}
        onSubmit={handleSubmit}
      >
        <button type="button" className="si--with--google-button btn--singIn">
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
        <label htmlFor="username" className="si--username-label">
          <span className="si--username-envelop-icon">
            <img src={userIcon} alt="username icon" />
          </span>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className={`si--username-input 
                ${
                  form.username.length > 7
                    ? "si--username-input-valid"
                    : form.username.length > 0
                    ? "si--username-input-invalid"
                    : ""
                }
              `}
            required
            pattern="^[@a-z0-9._]{8,}$"
            value={form.username}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="email" className="si--username-label">
          <span className="si--username-envelop-icon">
            <img src={envelopIcon} alt="email icon" />
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
        <label htmlFor="confirmPassword" className="si--username-label">
          <span className="si--username-envelop-icon">
            <img src={lockOpenIcon} alt="password icon" />
          </span>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className={`si--username-input 
            ${
              form.confirmPassword.length > 3
                ? "si--username-input-valid"
                : form.confirmPassword.length > 0
                ? "si--username-input-invalid"
                : "si--username-input-untouched"
            }
          `}
            pattern="^[A-Za-z0-9\W]{3,}$"
            required
            value={form.confirmPassword}
            onChange={handleChange}
          />
        </label>
        <button type="submit" className="si--submit-button btn--singIn">
          <p>Sign Up</p>
          <img src={rightArrowIcon} alt="sing in submit icon" />
        </button>
        <span className="si--create-account">
          <p>Do you have an account?</p>
          <button
            type="button"
            className="si--create-account-btn"
            onClick={() => navigate("/signin")}
          >
            Sign In
          </button>
        </span>
      </form>
    </div>
  );
};

export default SignUp;
