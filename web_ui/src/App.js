import './App.scss';
import { Switch, Route } from 'react-router-dom';

import Nav from './Nav';
import Home from './Home';


function App() {
    return (
        <>
            <Nav />
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
            </Switch>
        </>
    );
}

export default App;
