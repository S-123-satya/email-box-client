import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { logout, toggleLoginMode } from "../store";
import Button from "react-bootstrap/esm/Button";

const Header = () => {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const toggleLoginHandler = () => {
    dispatch(toggleLoginMode());
  };
  const logoutHander = () => {
    dispatch(logout());
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Mail box client</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        {authState.isLogin && <Button onClick={logoutHander}> Logout</Button>}
        <Button onClick={toggleLoginHandler}>
          {authState.isLoginMode ? "Login" : "SignUp"}
        </Button>
      </Container>
    </Navbar>
  );
};

export default Header;
