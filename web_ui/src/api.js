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

function load_user(token) {
    api_post("/user/info", {access_token: token}).then((data) => {
            api_get(`/user/${data.login}/repos`).then((repos) => {
                data.repos = repos
                store.dispatch({type: 'user/set', data: data})
            })
        })
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
