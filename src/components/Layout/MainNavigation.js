import { Link } from "react-router-dom";
import AppContext from "../../context/AppContext";

import classes from "./MainNavigation.module.css";
import { useContext } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const MainNavigation = () => {
  const { token, setToken } = useContext(AppContext);
  const history = useHistory();

  const handleLogOut = () => {
    setToken("");
    alert("Logged Out");
    history.push("/auth");
  };
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
                <button onClick={handleLogOut}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
