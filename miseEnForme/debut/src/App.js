import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Profile from "./Profile";
import {withRouter} from 'react-router-dom';
import React from 'react';

class App extends React.Component  {



    render() {
        return (

           <Router>
                <Home/>
                <Switch>
                    <Route exact path='/profile' component={Profile} />
                </Switch>

            </Router>

        );
    }

}



export default withRouter(App);
