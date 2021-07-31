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
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route path="/tasks">
                        <Tasks />
                    </Route>
                    <Route path="/profile">
                        <Profile />
                    </Route>
                    <Route path="*">
                        <NotFound />
                    </Route>
                </Switch>
            </Container>
        </Fragment>
    );
}

export default App;
