import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { load_user_repos } from "./api";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function User({ token, dispatch }) {
  const { user_name } = useParams();
  console.log(token);
  console.log(user_name);

  const [userData, setUserData] = useState([]);

  useEffect(async () => {
    let data = await load_user_repos(token, user_name);
    console.log(data);
    setUserData(data);
  }, []);

  if (!userData.data) {
    return null;
  }

  return (
    <div>
      <div>
        <h2>{user_name}</h2>
      </div>

      <Button>Add Friend</Button>
      <table className={"table table-striped"} style={{ width: "50%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
            {console.log(userData)}
          {userData.data.map(repo => (
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
      <div>
          <Link to="/" className="btn btn-secondary">Home</Link>
      </div>
    </div>
  );
}

export default connect(({ token }) => ({ token }))(User);
