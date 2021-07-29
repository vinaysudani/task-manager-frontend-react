import { useContext } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../store/auth-context";

const AppNavbar = () => {
    const authCtx = useContext(AuthContext);

    return (
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
            <Navbar.Brand as={Link} to="/">
                Task Manager
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {authCtx.isAuthenticated && (
                        <Nav.Link as={NavLink} to="/tasks" exact>
                            Tasks
                        </Nav.Link>
                    )}
                </Nav>
                <Nav>
                    {!authCtx.isAuthenticated && (
                        <Nav.Link as={NavLink} to="/login" exact>
                            Login
                        </Nav.Link>
                    )}
                    {!authCtx.isAuthenticated && (
                        <Nav.Link as={NavLink} to="/register" exact>
                            Register
                        </Nav.Link>
                    )}

                    {authCtx.isAuthenticated && (
                        <NavDropdown alignRight title={authCtx.userName}>
                            <NavDropdown.Item as={NavLink} to="/profile" exact>
                                Profile
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Logout
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">
                                Logout All
                            </NavDropdown.Item>
                        </NavDropdown>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default AppNavbar;
