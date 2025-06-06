import { Link } from "react-router-dom";
import AppContext from "../../context/AppContext";

import classes from "./MainNavigation.module.css";
import { useContext } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const MainNavigation = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);
  const history = useHistory();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
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
          {!isLoggedIn && (
            <>
              <li>
                <Link to="/auth">Login</Link>
              </li>
            </>
          )}
          {isLoggedIn && (
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
