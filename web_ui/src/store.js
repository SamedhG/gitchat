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

function call(state = [], action) {
    switch (action.type) {
        case 'call/clear':
            return []
        case 'call/push':
            return [...state, action.data]
        default:
            return state
    }
}


function room(state = null, action) {
    switch (action.type) {
        case 'room/set':
            return action.data;
        case 'room/clear':
            return null;
        case 'room/user':
            const users = state.users.filter(u => u.user !== action.data.user)
            users.push(action.data)
            state.users = users
            return state
        case 'room/collaborator':
            const collabs = state.collaborators.filter(u => u.user !== action.data.user)
            collabs.push(action.data)
            state.collaborators = collabs
            return state
        case 'room/leave':
            const col = state.collaborators.filter(u => u.user !== action.data)
            state.collaborators = col
            const us = state.users.filter(u => u.user !== action.data)
            state.users = us
            return state
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

export function load_user(){
    return JSON.parse(localStorage.getItem("user"));
}


function token(state = load_token(), action) {
    switch(action.type) {
        case 'token/set':
            save_token(action.data);
            return action.data;
        case 'token/clear':
            localStorage.removeItem("token")
            return null;
        default:
            return state
    }
}

export function save_token(token){
    localStorage.setItem("token", JSON.stringify(token));
    console.log("token saved")
}

export function load_token() {
   return JSON.parse(localStorage.getItem("token"));
}



function root_reducer(state, action) {
    let reducer = combineReducers({
        error, call, user, room, token
    });
    return reducer(state, action);
}

let store = createStore(root_reducer);
export default store;
