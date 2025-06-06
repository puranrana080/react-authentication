import { useRef, useContext } from "react";
import classes from "./ProfileForm.module.css";
import AppContext from "../../context/AppContext";

const ProfileForm = () => {
  const newPasswordRef = useRef();

  const { setIsLoggedIn } = useContext(AppContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const newEnteredPassword = newPasswordRef.current.value;
    if (!token) return alert("Need to login first");
    if (token) setIsLoggedIn(true);

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDLOTD964PNfHMmKh2v3Ad2DhAeDuOI60c",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
          password: newEnteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        newPasswordRef.current.value = "";
        alert("Password Changed");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          minLength="7"
          id="new-password"
          ref={newPasswordRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
