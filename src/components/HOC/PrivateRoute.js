import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import AuthContext from "../../store/auth-context";

const PrivateRoute = ({ children, ...rest }) => {
    const authCtx = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={({ location }) =>
                authCtx.isAuthenticated ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            search: `?redirect=${location.pathname}`,
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;
