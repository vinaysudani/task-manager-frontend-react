import { Fragment, useCallback, useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import axios from "axios";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Tasks from "./pages/Tasks";
import NotFound from "./pages/NotFound.js";
import AuthContext from "./store/auth-context";

import PrivateRoute from "./components/HOC/PrivateRoute";
import GuestRoute from "./components/HOC/GuestRoute";

let isFirstRender = true;

function App() {
    const authCtx = useContext(AuthContext);
    const authToken = authCtx.token;

    const setAxiosAuthToken = useCallback((authToken) => {
        if (authToken !== null) {
            axios.defaults.headers.common["Authorization"] =
                "Bearer " + authToken;
        } else {
            delete axios.defaults.headers.common["Authorization"];
        }
    }, []);

    if (isFirstRender) {
        setAxiosAuthToken(authToken);
    }

    useEffect(() => {
        if (!isFirstRender) {
            setAxiosAuthToken(authToken);
        }
        isFirstRender = false;
    }, [setAxiosAuthToken, authToken]);

    return (
        <Fragment>
            <Navbar></Navbar>
            <Container fluid>
                <Switch>
                    <Route path="/" exact>
                        <Home />
                    </Route>

                    <GuestRoute path="/login">
                        <Login />
                    </GuestRoute>
                    <GuestRoute path="/register">
                        <Register />
                    </GuestRoute>

                    <PrivateRoute path="/tasks">
                        <Tasks />
                    </PrivateRoute>
                    <PrivateRoute path="/profile">
                        <Profile />
                    </PrivateRoute>

                    <Route path="*">
                        <NotFound />
                    </Route>
                </Switch>
            </Container>
        </Fragment>
    );
}

export default App;
