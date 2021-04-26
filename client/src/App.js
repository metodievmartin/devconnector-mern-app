import {Fragment} from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import './App.css';
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

const App = () => {
    return (
        <Router>
            <Fragment>
                <Navbar/>
                <Route exact path='/' component={Landing}/>
                <section className="container">
                    <Switch>
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />
                    </Switch>
                </section>
            </Fragment>
        </Router>
    );
}

export default App;
