import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

const AppNavbar = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
            <Navbar.Brand as={Link} to="/">
                Task Manager
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={NavLink} to="/tasks" exact>
                        Tasks
                    </Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link as={NavLink} to="/login" exact>
                        Login
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/register" exact>
                        Register
                    </Nav.Link>

                    <NavDropdown alignRight title="Username">
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
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default AppNavbar;
