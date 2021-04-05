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


function token(state = load_token(), action) {
    switch('action.type') {
        case 'token/set':
            return action.data
        case 'token/clear':
            localStorage.removeItem("token")
            return null;
        default: 
            return state
    }
}

export function save_token(token){
    localStorage.setItem("token", JSON.stringify(token));
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
