import React, { useState } from "react";
import AppContext from "./AppContext";

const AppState = (props) => {
  let [token, setToken] = useState("");
  console.log("in context", token);
  return (
    <AppContext.Provider
      value={{
        setToken,
        token,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
