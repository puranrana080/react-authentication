import { useState, useRef, useContext } from "react";
import AppContext from "../../context/AppContext";
import classes from "./AuthForm.module.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { setToken, setIsLoggedIn } = useContext(AppContext);
  const history = useHistory();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    setIsLoading(true);
    if (isLogin) {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDLOTD964PNfHMmKh2v3Ad2DhAeDuOI60c",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json().then((data) => {
            let tokenId = data.idToken;
            const expirationTime = new Date().getTime()+60*1000 //1 hr
            setIsLoggedIn(true);
            localStorage.setItem("token", tokenId);
            localStorage.setItem('expirationTime',expirationTime)
            alert("Logged In");
            setToken(tokenId);
            history.push("/profile");
          });
        } else {
          return res.json().then((data) => {
            let errorMsg = "Wrong credentials";
            if (data) {
              errorMsg = data?.error?.message;
            }
            alert(errorMsg);
          });
        }
      });
    } else {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDLOTD964PNfHMmKh2v3Ad2DhAeDuOI60c",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        setIsLoading(false);
        if (res.ok) {
          alert("Successfully Registered");
          emailInputRef.current.value = "";
          passwordInputRef.current.value = "";
          setIsLogin(true);
        } else {
          return res.json().then((data) => {
            let errorMsg = "Authentication Failed";
            if (data) {
              errorMsg = data?.error?.message;
            }
            alert(errorMsg);
          });
        }
      });
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p style={{ color: "white" }}>Sending Request...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
