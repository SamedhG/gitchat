import { useEffect } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { load_user } from "./api";
import { load_token } from "./store";
import Nav from './Nav';


function Home({ user, token, dispatch }) {
  token = token || load_token();

  useEffect(() => {
    if (token && !user) {
      load_user(token);
    }
    console.log(token);
  }, [token]);

  if (!user) {
    return (
      <div>
        <Link to="/login" className="btn btn-primary">
          Login
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2>
        <div>
          Welcome {user.login}{" "}
          <img style={{ width: "50px" }} src={user.avatar_url} alt={"Avatar"} />
        </div>
      </h2>
      <br/>
      <div style={{width: "75%"}}>
        <Nav />

      </div>
      <br/>
      <h3>Your Repositories</h3>
      <table className={"table table-striped"} style={{ width: "50%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {user.repos.map((repo) => (
            <tr key={repo.id}>
              <td>
                <a href={repo.html_url} target="_blank" rel="noreferrer">{repo.name}</a>
              </td>
              <td>
                <Link to={`/room/${repo.full_name}`}>Join Call</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default connect(({ user, token }) => ({ user, token }))(Home);
