import { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { api_post, load_user } from "./api";
import { load_token } from "./store";
import { Button } from "react-bootstrap";
import Nav from "./Nav";
import moment from "moment";
import Heart from "react-animated-heart";

function Home({ user, token, dispatch }) {
  token = token || load_token();
  const history = useHistory();

  useEffect(() => {
    if (token && !user) {
      load_user(token);
    }
  }, [token]);

  if (!user) {
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "100px",
          }}
        >
          <Link
            to="/login"
            className="btn btn-primary"
            style={{ padding: "2rem 5rem", fontSize: "1.5rem" }}
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  const joinCall = async (repo) => {
    const body = { repo: repo.full_name, url: repo.html_url, user: user.login };
    const data = (await api_post("/user/recent", body)).recents;
    dispatch({ type: "user/set", data: { ...user, recents: data } });
    history.push(`/room/${repo.full_name}`);
  };

  const isFavorited = (repo) => {
    return user.favorites.filter((favorite) => favorite.repo === repo.full_name)
      .length;
  };

  const toggleFavorite = async (repo) => {
    const body = { repo: repo.full_name, url: repo.html_url, user: user.login };
    const data = (await api_post("/user/favorite", body)).favorites;
    dispatch({ type: "user/set", data: { ...user, favorites: data } });
  };

  const acceptFriendRequest = async (request) => {
    const body = { inviter_id: request.inviter.id, invitee: user.login };
    const data = await api_post("/user/request/accept", body);
    dispatch({
      type: "user/set",
      data: { ...user, requests: data.requests, friends: data.friends },
    });
  };

  const renderFriend = (pair) => {
    const friend =
      pair.inviter.name === user.login ? pair.invitee : pair.inviter;
    return (
      <tr key={pair.id}>
        <td>
          <img
            style={{ width: "25px" }}
            src={friend.avatar_url}
            alt={"Avatar"}
          />
          <Link
            to={{
              pathname: `/user/${friend.name}`,
              state: {
                user: { ...friend, login: friend.name },
              },
            }}
          >
            {friend.name}
          </Link>
        </td>
      </tr>
    );
  };

  return (
    <div>
      <Nav />
      <br />
      <h2>
        <div>
          Welcome {user.login}{" "}
          <img style={{ width: "50px" }} src={user.avatar_url} alt={"Avatar"} />
        </div>
      </h2>
      <br />
      <div className={"row"}>
        <div className={"container"}>
          <div className={"col"}>
            <h3>Your Repositories</h3>
            <div className={"repo-table"}>
              <table className={"table table-striped"}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th />
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {user.repos.map((repo) => (
                    <tr key={repo.id}>
                      <td>
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {repo.name}
                        </a>
                      </td>
                      <td style={{ padding: 0 }}>
                        <Heart
                          isClick={isFavorited(repo)}
                          onClick={() => toggleFavorite(repo)}
                        />
                      </td>
                      <td>
                        <Button onClick={() => joinCall(repo)}>
                          Join Call
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="container-side">
            <div className={"col"}>
              <h3>Recently Visited Repos</h3>
              <div className="small-table">
                <table className={"table table-striped"}>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Visited</th>
                      <th />
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {user.recents.map((recent) => (
                      <tr key={recent.id}>
                        <td>
                          <a href={recent.url} target="_blank" rel="noreferrer">
                            {recent.repo}
                          </a>
                        </td>
                        <td>{moment(`${recent.created}Z`).fromNow()}</td>
                        <td style={{ padding: 0 }}>
                          <Heart
                            isClick={isFavorited({ full_name: recent.repo })}
                            onClick={() =>
                              toggleFavorite({
                                full_name: recent.repo,
                                html_url: recent.url,
                              })
                            }
                          />
                        </td>
                        <td>
                          <Button
                            onClick={() =>
                              joinCall({
                                full_name: recent.repo,
                                html_url: recent.url,
                              })
                            }
                          >
                            Join Call
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className={"col"}>
              <h3>Your Favorites</h3>
              <div className="small-table">
                <table className={"table table-striped"}>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th />
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {user.favorites.map((favorite) => (
                      <tr key={favorite.id}>
                        <td>
                          <a
                            href={favorite.url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {favorite.repo}
                          </a>
                        </td>
                        <td style={{ padding: 0 }}>
                          <Heart
                            isClick={isFavorited({ full_name: favorite.repo })}
                            onClick={() =>
                              toggleFavorite({
                                full_name: favorite.repo,
                                html_url: favorite.url,
                              })
                            }
                          />
                        </td>
                        <td>
                          <Button
                            onClick={() =>
                              joinCall({
                                full_name: favorite.repo,
                                html_url: favorite.url,
                              })
                            }
                          >
                            Join Call
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div class="break"></div>
            <div className={"col"}>
              <h3>Friend Requests</h3>
              <div className="small-table">
                <table className={"table table-striped"}>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {user.requests.map((request) => (
                      <tr key={request.id}>
                        <td>
                          <img
                            style={{ width: "25px" }}
                            src={request.inviter.avatar_url}
                            alt={"Avatar"}
                          />
                          <Link
                            to={{
                              pathname: `/user/${request.inviter.name}`,
                              state: {
                                user: {
                                  ...request.inviter,
                                  login: request.inviter.name,
                                },
                              },
                            }}
                          >
                            {request.inviter.name}
                          </Link>
                        </td>
                        <td>
                          <Button onClick={() => acceptFriendRequest(request)}>
                            Accept
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className={"col scroll"}>
              <h3>Your Friends</h3>
              <div className="small-table">
                <table className={"table table-striped"}>
                  <thead>
                    <tr>
                      <th>Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.friends.map((pair) => renderFriend(pair))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default connect(({ user, token }) => ({ user, token }))(Home);
