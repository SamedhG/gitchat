// reference : https://levelup.gitconnected.com/how-to-implement-login-with-github-in-a-react-app-bd3d704c64fc
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

function Login({ user, dispatch }) {
  const client_id = process.env.REACT_APP_CLIENT_ID;
  const redirect_uri = process.env.REACT_APP_REDIRECT_URI;
  const [userData, setUserData] = useState({});

  function setUser(user) {
    dispatch({ type: "user/set", data: user });
  }

  useEffect(() => {
    // After requesting Github access, Github redirects back to your app with a code parameter
    const url = window.location.href;
    const hasCode = url.includes("?code=");
    console.log(redirect_uri)
    console.log("HERE")


    // If Github API returns the code parameter
    if (hasCode) {

      const newUrl = url.split("?code=");
      window.history.pushState({}, null, newUrl[0]);
      const userCode = newUrl[1];


      const requestData = {
        code: userCode,
      };

      const proxy_url = "http://localhost:4000/api/v1/user/login";

      console.log(requestData);

      // Use code parameter and other parameters to make POST request to proxy_server
      fetch(proxy_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
          setUser({access_token: data.access_token});
        });
    }
  }, [dispatch, userData]);

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <a
        href={`https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}&redirect_uri=${redirect_uri}`}
        onClick={(data) => {
          console.log(data);
          setUserData({ ...userData });
        }}
      >
        {" "}
        Login with Github{" "}
      </a>
    </div>
  );
}

export default connect(({ user }) => ({ user }))(Login);
