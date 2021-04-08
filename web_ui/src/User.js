import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {Link, useLocation, useParams} from "react-router-dom";
import {load_user_repos} from "./api";
import {Button} from "react-bootstrap";

function User({token, dispatch}) {
    const location = useLocation();
    const params = useParams();
    const user = location.state?.user || {login: params.user_name};
    console.log(token);

    const [userData, setUserData] = useState([]);

    useEffect(async () => {
        let data = await load_user_repos(token, user.login);
        console.log(data);
        setUserData(data);
    }, []);

    if (!userData.data) {
        return null;
    }

    return (
        <div>
            <h2>
            <div>
                {user.login}{" "}
                {user.avatar_url && <img style={{width: "50px"}} src={user.avatar_url} alt={"Avatar"}/>}
            </div>
            </h2>

            <Button>Add Friend</Button>
            <table className={"table table-striped"} style={{width: "50%"}}>
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

export default connect(({token}) => ({token}))(User);
