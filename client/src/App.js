import {Fragment, useEffect} from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
//Redux
import {Provider} from "react-redux";
import store from "./store";
import {LOGOUT} from "./actions/types";
import {loadUser} from "./actions/auth";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import AddExperience from "./components/profile-forms/AddExperience";
import AddEducation from "./components/profile-forms/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
import ProfileForm from "./components/profile-forms/ProfileForm";

import setAuthToken from "./utils/setAuthToken";

import './App.css';

const App = () => {
    useEffect(() => {
        // check for token in LS
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        store.dispatch(loadUser());

        // log user out from all tabs if they log out in one tab
        window.addEventListener('storage', () => {
            if (!localStorage.token) store.dispatch({ type: LOGOUT });
        });
    }, []);

    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <Navbar/>
                    <Route exact path='/' component={Landing}/>
                    <section className="container">
                        <Alert />
                        <Switch>
                            <Route exact path="/register" component={Register}/>
                            <Route exact path="/login" component={Login}/>
                            <Route exact path="/profiles" component={Profiles}/>
                            <Route exact path="/profile/:id" component={Profile}/>
                            <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                            <PrivateRoute exact path="/posts" component={Posts}/>
                            <PrivateRoute exact path="/posts/:id" component={Post}/>
                            <PrivateRoute exact path="/create-profile" component={ProfileForm}/>
                            <PrivateRoute exact path="/edit-profile" component={ProfileForm}/>
                            <PrivateRoute exact path="/add-experience" component={AddExperience}/>
                            <PrivateRoute exact path="/add-education" component={AddEducation}/>
                            <PrivateRoute exact path="/add-education" component={AddEducation}/>
                        </Switch>
                    </section>
                </Fragment>
            </Router>
        </Provider>
    );
}

export default App;
