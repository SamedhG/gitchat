import './App.scss';
import { Switch, Route } from 'react-router-dom';

import Nav from './Nav';
import Home from './Home';
import CallRoom from './CallRoom';

function App() {
    return (
        <>
            <Nav />
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/room/:id" component={CallRoom} exact />
            </Switch>
        </>
    );
}

export default App;
