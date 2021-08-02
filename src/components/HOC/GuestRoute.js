import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import AuthContext from "../../store/auth-context";

const GuestRoute = ({ children, ...rest }) => {
    const authCtx = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={({ location }) =>
                !authCtx.isAuthenticated ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/tasks",
                        }}
                    />
                )
            }
        />
    );
};

export default GuestRoute;
