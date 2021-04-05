// reference : https://levelup.gitconnected.com/how-to-implement-login-with-github-in-a-react-app-bd3d704c64fc
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {load_user, save_user} from "./store";
import {api_post} from './api';

function Login({ user, dispatch }) {
  const client_id = process.env.REACT_APP_CLIENT_ID;
  const redirect_uri = process.env.REACT_APP_REDIRECT_URI;
  const [userCredentials, setUserCredentials] = useState();

  useEffect(() => {
    // After requesting Github access, Github redirects back to your app with a code parameter
    const url = window.location.href;
    const hasCode = url.includes("?code=");


    // If Github API returns the code parameter
    if (hasCode) {

      const newUrl = url.split("?code=");
      window.history.pushState({}, null, newUrl[0]);
      const userCode = newUrl[1];

      // Use code parameter and other parameters to make POST request to proxy_server
        api_post("/user/login", {code: userCode})
        .then((data) => {
          save_user({access_token: data.access_token});
          setUserCredentials(data);
        });
    }
  });

  if (load_user()) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <a
        href={`https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}&redirect_uri=${redirect_uri}`}
      >
        {" "}
        Login with Github{" "}
      </a>
        {JSON.stringify(userCredentials) }
    </div>
  );
}

export default connect(({ user }) => ({ user }))(Login);
