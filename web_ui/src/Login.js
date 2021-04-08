// reference : https://levelup.gitconnected.com/how-to-implement-login-with-github-in-a-react-app-bd3d704c64fc
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { save_token } from "./store";
import {api_post} from './api';


function Login({ token, dispatch }) {
    const client_id = process.env.REACT_APP_CLIENT_ID;
    const redirect_uri = process.env.REACT_APP_REDIRECT_URI;
    const history = useHistory()
    useEffect(() => {
        // After requesting Github access, Github redirects back to your app with a code parameter
        const url = window.location.href;
        const hasCode = url.includes("?code=");

        // If Github API returns the code parameter
        if (hasCode) {
            const newUrl = url.split("?code=");
            const userCode = newUrl[1];

            // Use code parameter and other parameters to make POST request to proxy_server
            api_post("/user/login", {code: userCode})
                .then((data) => {
                    save_token(data.access_token);
                })
                .then(() => {
                    history.push("/");
                });
        }
    });

    if (token) {
        return <Redirect to="/" />;
    }

    return (
        <div style={{display: "flex", justifyContent:'center', marginTop:'100px'}}>
            <a className="btn btn-primary" style={{padding:'2rem 5rem', fontSize:'1.5rem'}}
                href={`https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}&redirect_uri=${redirect_uri}`}
            >
                {" "}
                Login with Github{" "}
            </a>
        </div>
    );
}

export default connect(({ token }) => ({ token }))(Login);
