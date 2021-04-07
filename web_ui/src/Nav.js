import { AsyncTypeahead } from "react-bootstrap-typeahead";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { load_user_search } from "./api"


function Nav({ token, dispatch }) {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const handleSearch = async (query) => {
    setIsLoading(true);
    const items = await load_user_search(token, query);
    console.log(items)


    setOptions(items.data);
    setIsLoading(false);
  };

  const filterBy = () => true;

  return (
    <AsyncTypeahead
      filterBy={filterBy}
      id="search_users"
      isLoading={isLoading}
      labelKey="login"
      minLength={3}
      onSearch={handleSearch}
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
          <span>
            <Link to={`/user/${option.login}`}>{option.login}</Link>
          </span>
        </Fragment>
      )}
    />
  );
}

export default connect(({ token }) => ({token }))(Nav);

