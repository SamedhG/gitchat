import store from './store';
export const BASE_URL =
    process.env.NODE_ENV === "production" ?
    "https://gitchat.samedh.site/api/v1" :
    "http://localhost:4000/api/v1";

export async function api_get(path) {
    let text = await fetch( BASE_URL + path, {});
    let resp = await text.json();
    return resp.data;
}


export async function api_post(path, data) {
    let opts = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    };
    let text = await fetch(BASE_URL + path, opts);
    const returnData = await text.json();
    return returnData;
}

export async function load_user(token) {
    api_post("/user/info", {access_token: token}).then((data) => {
        store.dispatch({type: 'user/set', data: data})
    })
}

export async function load_user_repos(token, username) {
    return api_post(`/user/${username}/repos`, {access_token: token})
}

export async function load_user_search(token, query){
    return api_post(`/search/users?term=${query}&limit=20`, {access_token: token})
}

export function load_defaults() {
    // load default data here
    // Something like:
    // if(store.getState().session) fetch...()
    let state = store.getState()
    if(state.token) {
        load_user(state.token)
    }
    return;
}
