import { connect } from "react-redux";
import {Link} from 'react-router-dom';

function Home({user, dispatch}) {

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

export default connect(({ user}) => ({ user }))(Home);
