import React, { useState ,useEffect} from "react";
import AppContext from "./AppContext";

const AppState = (props) => {
  const initialToken = localStorage.getItem("token");
  const expirationTime = localStorage.getItem("expirationTime");
  const [token, setToken] = useState(initialToken);
  let [isLoggedIn, setIsLoggedIn] = useState(token ? true : false);

  useEffect(() => {
    if (initialToken && expirationTime) {
      const now = new Date().getTime();
      const remainingTime = +expirationTime - now;
      if (remainingTime <= 0) {
        localStorage.removeItem("token");
        localStorage.removeItem("expirationTime");
        setToken(null);
        setIsLoggedIn(false);
      } else {
        const logoutTimer = setTimeout(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("expirationTime");
           alert("Session expired. Please login again.")
          setToken(null);
          setIsLoggedIn(false);
        }, remainingTime);
        return () => clearTimeout(logoutTimer);
      }
    }
  }, [initialToken, expirationTime]);

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        token,
        setToken,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
