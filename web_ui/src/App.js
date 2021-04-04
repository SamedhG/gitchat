import './App.scss';
import { Switch, Route } from 'react-router-dom';

import Nav from './Nav';
import Home from './Home';
import CallRoom from './calls/CallRoom';
import Login from './Login';

function App() {
    return (
        <>
            <Nav />
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/room/:repo_user/:repo_name" component={CallRoom} exact />
                <Route path="/login" exact>
                    <Login />
                </Route>
            </Switch>
        </>
    );
}

export default App;
