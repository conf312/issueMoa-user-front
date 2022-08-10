import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Cookies } from "react-cookie";
import * as AxiosUtil from '../../lib/js/AxiosUtil';

function PrivateRoute() {
  const cookies = new Cookies();
  let auth = cookies.get("authFlag") ? true : false;

  if (!auth) {
    if (cookies.get("accessToken") !== undefined) {
      AxiosUtil.send("POST", "/issuemoa/users/reissue", new FormData(), "", (e) => {
        const data = e.data;
        
        cookies.set("accessToken", data.accessToken, {
          path: "/"
        });
        cookies.set("authFlag", true, {
          path: "/",
          maxAge: data.accessTokenExpires
        });
        
        let href = window.location.href;
        window.location.href = href.substring(href.lastIndexOf("/"));
      });
    } else {
      return <Navigate to="/SignIn" />;
    }
  } else {
    return <Outlet />;
  }
  
  //let auth = cookies.get("accessToken") ? true : false; // determine if authorized, from context or however you're doing items
  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  //return auth ? <Outlet /> : <Navigate to="/SignIn" />;
}

export default PrivateRoute;