import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {Link, useLocation, useParams, useHistory} from "react-router-dom";
import {api_post, load_user_repos} from "./api";
import {Button} from "react-bootstrap";
import Heart from "react-animated-heart";
import Nav from "./Nav"

function User({token, user, dispatch}) {
    const location = useLocation();
    const params = useParams();
    const history = useHistory();
    const searched_user = location.state?.user || {login: params.user_name};

    const [userData, setUserData] = useState([]);

    useEffect(async () => {
        let data = await load_user_repos(token, searched_user.login);
        setUserData(data);
    }, []);

    if (!userData.data) {
        return null;
    }

    const joinCall = async repo => {
        const body = {repo: repo.full_name, url: repo.html_url, user: user.login};
        const data = (await api_post("/user/recent", body)).recents;
        dispatch({type: 'user/set', data: {...user, recents: data}});
        history.push(`/room/${repo.full_name}`);
    };

    const isFavorited = repo => {
        return user.favorites.filter(favorite => favorite.repo === repo.full_name).length
    };

    const toggleFavorite = async repo => {
        const body = {repo: repo.full_name, url: repo.html_url, user: user.login};
        const data = (await api_post("/user/favorite", body)).favorites;
        dispatch({type: 'user/set', data: {...user, favorites: data}});
    };

    return (
        <div>
            <Nav />
            <h2>
            <div>
                {searched_user.login}{" "}
                {searched_user.avatar_url && <img style={{width: "50px"}} src={searched_user.avatar_url} alt={"Avatar"}/>}
            </div>
            </h2>

            <Button>Add Friend</Button>
            <table className={"table table-striped"} style={{width: "50%"}}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th/>
                        <th/>
                    </tr>
                </thead>
                <tbody>
                    {userData.data.map(repo => (
                        <tr key={repo.id}>
                            <td>
                                <a href={repo.html_url} target="_blank" rel="noreferrer">{repo.name}</a>
                            </td>
                            <td style={{padding: 0}}>
                                <Heart isClick={isFavorited(repo)} onClick={() => toggleFavorite(repo)}/>
                            </td>
                            <td>
                                <Button onClick={() => joinCall(repo)}>Join Call</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default connect(({token, user}) => ({token, user}))(User);
