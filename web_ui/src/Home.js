import {useEffect} from "react";
import {connect} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import {api_post, load_user} from "./api";
import {load_token} from "./store";
import {Button} from "react-bootstrap";
import Nav from './Nav';
import moment from "moment";


function Home({user, token, dispatch}) {
    token = token || load_token();
    console.log(user);
    const history = useHistory();

    useEffect(() => {
        if (token && !user) {
            load_user(token);
        }
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

    const joinCall = async repo => {
        const body = {repo: repo.full_name, url: repo.html_url, user: user.login};
        const data = (await api_post("/user/recent", body)).recents;
        dispatch({type: 'user/set', data: {...user, recents: data}});
        history.push(`/room/${repo.full_name}`);
    };

    return (
        <div>
            <h2>
                <div>
                    Welcome {user.login}{" "}
                    <img style={{width: "50px"}} src={user.avatar_url} alt={"Avatar"}/>
                </div>
            </h2>
            <br/>
            <div style={{width: "75%"}}>
                <Nav/>

            </div>
            <br/>
            <div className={"row"}>
                <div className={"col"}>
                    <h3>Your Repositories</h3>
                    <table className={"table table-striped"}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th/>
                            </tr>
                        </thead>
                        <tbody>
                            {user.repos.map((repo) => (
                                <tr key={repo.id}>
                                    <td>
                                        <a href={repo.html_url} target="_blank" rel="noreferrer">{repo.name}</a>
                                    </td>
                                    <td>
                                        <Button onClick={() => joinCall(repo)}>Join Call</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className={"col"}>
                    <h3>Recently Visited Repos</h3>
                    <table className={"table table-striped"}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Visited</th>
                                <th/>
                            </tr>
                        </thead>
                        <tbody>
                            {user.recents.map((recent) => (
                                <tr key={recent.id}>
                                    <td>
                                        <a href={recent.url} target="_blank" rel="noreferrer">{recent.repo}</a>
                                    </td>
                                    <td>
                                        {moment(`${recent.created}Z`).fromNow()}
                                    </td>
                                    <td>
                                        <Button onClick={() => joinCall({full_name: recent.repo, html_url: recent.url})}>Join Call</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default connect(({user, token}) => ({user, token}))(Home);
