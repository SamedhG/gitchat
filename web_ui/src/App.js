import './App.scss';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import CallRoom from './calls/CallRoom';
import Login from './Login';
import User from './User';

function App() {
    return (
        <>
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/room/:repo_user/:repo_name" component={CallRoom} exact />
                <Route path="/login" exact>
                    <Login />
                </Route>
                <Route path="/user/:user_name" component={User} />
            </Switch>
        </>
    );
}

export default App;
