import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Container from "react-bootstrap/esm/Container";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { login } from "../../store";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailInp, setEmailInp] = useState("");
  const [passwordInp, setPasswordInp] = useState("");
  const [cpasswordInp, setCpasswordInp] = useState("");
  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      if (!authState.isLoginMode && cpasswordInp !== passwordInp) {
        alert("Password are not matching");
        return;
      } else {
        const obj = {
          email: emailInp,
          password: passwordInp,
        };
        let url = null;
        if (authState.isLoginMode) {
          url = `http://localhost:5000/user`;
        } else url = `http://localhost:5000/user/signup`;
        const response = await axios.post(url, obj);
        const { email, password, token } = response.data;
        dispatch(login({ email, password, token }));
        alert("User signup successfully");
        setEmailInp("");
        setPasswordInp("");
        if (!authState.isLoginMode) setCpasswordInp("");
        navigate("/inbox");
      }
    } catch (error) {
      //somthing went wrong
      console.log(e.target);
      console.log(error);
      alert(`somthing went wrong`);
      // throw new Error(error.message);
    }
  };
  return (
    <Container className="pt-5  d-flex align-items-center justify-content-center ">
      <Row className="pt-5 w-50 ">
        <Col className="pt-5">
          <Form
            className="pt-4 m-1 bg-success rounded-2 fs-3"
            onSubmit={submitHandler}
          >
            <h3 className="text-center text-bg-success p-2 ">
              {authState.isLoginMode ? "Login" : "SignUp"}
            </h3>
            <Form.Group
              className="mx-2 bg-light rounded-top-2"
              controlId="formBasicEmail"
            >
              <Form.Label className="m-1">Email address</Form.Label>
              <Form.Control
                type="email"
                value={emailInp}
                onChange={(e) => setEmailInp(e.target.value)}
                placeholder="Enter email"
                required
              />
            </Form.Group>
            <Form.Group
              className={
                authState.isLoginMode
                  ? "mx-2 bg-light rounded-bottom-2"
                  : "mx-2 bg-light"
              }
              controlId="formBasicPassword"
            >
              <Form.Label className="m-1">Password</Form.Label>
              <Form.Control
                type="password"
                value={passwordInp}
                onChange={(e) => setPasswordInp(e.target.value)}
                placeholder="Password"
              />
            </Form.Group>
            {!authState.isLoginMode && (
              <Form.Group
                className="mx-2  bg-light rounded-bottom-2"
                controlId="formBasicConfirmPassword"
              >
                <Form.Label className="m-1">Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  value={cpasswordInp}
                  onChange={(e) => setCpasswordInp(e.target.value)}
                  placeholder="Password"
                />
              </Form.Group>
            )}
            <div className="text-center text-bg-success p-2 rounded-bottom-2">
              <Button
                variant="info"
                className="fs-4 fw-semibold m-2 text-primary w-md-50"
                type="submit"
              >
                {authState.isLoginMode ? "Login" : "SignUp"}
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
