import React, { useState, useEffect, useContext } from "react";
import {Context} from "../store/appContext";

export const Private = () => {
  const [error, setError] = useState('');
  const {actions} = useContext(Context);

  useEffect(() => {
    accessPrivate();
    actions.changeBtnStyle();
  }, []);


  const accessPrivate = async () => {
    setError(null);
    const response = await fetch(
      "https://3001-4geeksacade-reactflaskh-8u9y31hus2f.ws-eu44.gitpod.io/api/private",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    const data = await response.json();
    if(!localStorage.getItem("token")){
      setError("No authorized")
    }
  };

  if (localStorage.getItem("token")) {
    return (
      <div className="text-center mt-5">
        <img
          className="mt-5"
          src="https://images.assetsdelivery.com/compings_v2/maxborovkov/maxborovkov1809/maxborovkov180900067.jpg"
          alt="wellcome"
        />
        <div className="row mt-5">
          <a className="col-12" href="#">
            News
          </a>
          <a className="col-12" href="#">
            Weather
          </a>
          <a className="col-12" href="#">
            Learn
          </a>
          <a className="col-12" href="#">
            About us
          </a>
        </div>
      </div>
    );
  } else {
   return (<h1 className="text-center mt-5">{error}</h1>);
  }
};
