import { createStore, combineReducers } from 'redux';


function error(state = null, action) {
    switch (action.type) {
        case 'error/clear':
            return null;
        case 'error/set':
            setTimeout(() => store.dispatch({type: "error/clear"}), 5000)
            return action.data;
        default:
            return state;
    }
}


function save_session(sess) {
    let session = Object.assign({}, sess, {time: Date.now()});
    localStorage.setItem("session", JSON.stringify(session));
}

function load_session() {
    let session = localStorage.getItem("session");
    if (!session) {
        return null;
    }
    session = JSON.parse(session);
    let age = Date.now() - session.time;
    let hours = 60*60*1000;
    if (age < 24 * hours) {
        return session;
    }
    else {
        return null;
    }
}

function session(state = load_session(), action) {
    switch (action.type) {
        case 'session/set':
            save_session(action.data);
            return action.data;
        case 'session/clear':
            localStorage.removeItem("session");
            return null;
        default:
            return state;
    }
}

function user(state = null, action) {
    switch (action.type) {
        case 'user/set':
            return action.data;
        case 'user/clear':
            return null;
        default:
            return state;
    }
}

export function save_user(user){
    localStorage.setItem("user", JSON.stringify(user));
}

export function load_user() {
   return JSON.parse(localStorage.getItem("user"));
}

export function clear_user() {
    localStorage.removeItem("user");
}

function root_reducer(state, action) {
    let reducer = combineReducers({
        error, session, user
    });
    return reducer(state, action);
}

let store = createStore(root_reducer);
export default store;
