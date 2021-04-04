import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { load_user } from "./store";
import { api_post, api_get } from "./api";
import {Link} from 'react-router-dom';

function Home({user, dispatch}) {

  useEffect(async () => {
    let userCredentials = load_user();
    if (userCredentials) {
      const requestData = {
        access_token: userCredentials.access_token,
      };

      // Use code parameter and other parameters to make POST request to proxy_server
      const userData = await api_post("/user/info", requestData);

      const userRepos = await api_get(`/user/${userData.login}/repos`);
      userData.repos = userRepos;
      dispatch({type: 'user/set', data: userData});
    }
  }, []);

  if (!user) {
    return <div>Please Login!</div>
  }

  return (
    <div>
      <h2>
        <div>Welcome {user.login} <img style={{width: "50px"}} src={user.avatar_url} alt={"Avatar"}/></div>
      </h2>
      <h3>
        Repositories
      </h3>
      <table className={"table table-striped"} style={{width: "50%"}}>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {user.repos.map((repo) => (
              <tr key={repo.id}>
                <td><Link to={`/room/${repo.full_name}`}>{repo.name}</Link></td>
              </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default connect(({user}) => ({ user }))(Home);
