import {AsyncTypeahead} from "react-bootstrap-typeahead";
import React, {Fragment, useState} from "react";
import {api_get} from "./api";

export default function Nav() {
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState([]);

    const handleSearch = async (query) => {
        setIsLoading(true);
        const items = await api_get(`/search/users?term=${query}&limit=20`);

        setOptions(items);
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
                            height: '24px',
                            marginRight: '10px',
                            width: '24px',
                        }}
                    />
                    <span>{option.login}</span>
                </Fragment>
            )}
        />
    );
}
