import React, { useState } from "react";
import AppContext from "./AppContext";

const AppState = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  let [isLoggedIn, setIsLoggedIn] = useState(token ? true : false);

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
