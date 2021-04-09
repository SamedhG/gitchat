import { AsyncTypeahead } from "react-bootstrap-typeahead";
import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { load_user_search } from "./api";
import { load_token } from "./store";
import { Navbar, Button } from "react-bootstrap";

function Nav({ token, dispatch }) {
  token = token || load_token();
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const history = useHistory();

  const handleSearch = async (query) => {
    setIsLoading(true);
    const items = await load_user_search(token, query);
    console.log(items);

    setOptions(items.data);
    setIsLoading(false);
  };

  const clickUser = (users) => {
      if (users) {
          const user = users[0];
          history.push(`/user/${user.login}`, {user});
      }
  };

  function logout(ev) {
    dispatch({type:'token/clear'});
    dispatch({type:'user/clear'});
    history.push('/')
  }

  function home(ev) {
      history.push('/')
  }

  const filterBy = () => true;

  return ( <Navbar>
      <AsyncTypeahead
      filterBy={filterBy}
      id="search_users"
      isLoading={isLoading}
      labelKey="login"
      minLength={3}
      onSearch={handleSearch}
      onChange={clickUser}
      options={options}
      placeholder="Search for a Github user..."
      renderMenuItemChildren={(option, props) => (
        <Fragment>
          <img
            alt={option.login}
            src={option.avatar_url}
            style={{
              height: "24px",
              marginRight: "10px",
              width: "24px",
            }}
          />
          <span>{option.login}</span>
        </Fragment>
      )}
    />
    <Button className="btn btn-secondary" style={{margin:"10px"}} onClick={logout}>Logout</Button>
    <Button className="btn btn-secondary" onClick={home}>Home</Button>

  </Navbar>

  );
}

export default connect(({ token }) => ({ token }))(Nav);
