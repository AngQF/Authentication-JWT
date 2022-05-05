import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export const Login = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState();
  const [type, setType] = useState("button");
  const history = useHistory();

  const saveUsersInDB = async () => {
    if (
      user.email != null &&
      user.email.trim() != "" &&
      user.password != null &&
      user.password.trim() != ""
    ) {
      setError(null);
      const response = await fetch(
        "https://3001-4geeksacade-reactflaskh-8u9y31hus2f.ws-eu44.gitpod.io/api/login",
        {
          method: "POST",
          body: JSON.stringify(user),
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();

      if (data.logged == false) {
        setError("Invalid email or password");
      } else if (data.logged == true) {
        localStorage.setItem("token", data.token);
        history.push("/private");
      }
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="mt-5">
      <p className="text-center">LOGIN WITH YOUR USER</p>
      <form className="col-4 m-auto">
        <div className="mb-3 ">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <h4 className="text-danger">{error}</h4>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            saveUsersInDB(),
              user.email.trim() != "" && user.password.trim() != ""
                ? setType("button")
                : setType("button");
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};
