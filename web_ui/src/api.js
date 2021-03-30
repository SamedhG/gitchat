import store from './store';
export const BASE_URL = 
    process.env.NODE_ENV === "production" ? 
    "http://gitchat.example.com/api/v1" : 
    "http://localhost:4000/api/v1"

async function api_get(path) {
    let text = await fetch( BASE_URL + path, {});
    let resp = await text.json();
    return resp.data;
}


async function api_post(path, data) {
    let token =  store.getState().session && store.getState().session.token
    let opts = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-auth': token
        },
        body: JSON.stringify(data),
    };
    let text = await fetch(BASE_URL + path, opts);
    return await text.json();
}

async function api_patch(path, data) {
    let token =  store.getState().session && store.getState().session.token
    let opts = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'x-auth': token
        },
        body: JSON.stringify(data),
    };
    let text = await fetch(BASE_URL + path, opts);
    return await text.json();
}

async function api_delete(path) {
    let token =  store.getState().session && store.getState().session.token
    let opts = {
        method: 'DELETE',
        headers: { 'x-auth': token },
    };
    return await fetch(BASE_URL + path, opts);
}

export function load_defaults() {
    // load default data here
    // Something like:
    // if(store.getState().session) fetch...()
    return;
}
