import React, {useState, useContext} from "react";
import { Link } from "react-router-dom";
import {Context} from "../store/appContext";
import { useHistory } from "react-router-dom";

export const Navbar = () => {
  const history = useHistory();
	const [style, setStyle] = useState({ display: "inline-block" });
  const {store} = useContext(Context);




  const logOut = async () => {
    localStorage.removeItem("token");
  };

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">React Boilerplate</span>
        </Link>
        <div className="float-end">
          <Link to="/signup">
            <button className="btn btn-primary">Signup</button>
          </Link>
          {localStorage.getItem("token") ? (
            <button
              onClick={() => {
                logOut(), history.push("/login"), setStyle({display: "inline-block"})
              }}
              className="btn btn-secondary mx-2"
              style={store.btnLogoutStyle}
            >
              Logout
            </button>
          ) : (
            <Link to="/login" style={style}>
              <button className="btn btn-secondary mx-2">Login</button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
