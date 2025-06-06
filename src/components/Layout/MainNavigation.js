import { Link } from "react-router-dom";
import AppContext from "../../context/AppContext";

import classes from "./MainNavigation.module.css";
import { useContext } from "react";

const MainNavigation = () => {
  const { token, setToken } = useContext(AppContext);
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!token && (
            <>
              <li>
                <Link to="/auth">Login</Link>
              </li>
            </>
          )}
          {token && (
            <>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <button onClick={() => setToken("")}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
