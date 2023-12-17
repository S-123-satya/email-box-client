import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Container from "react-bootstrap/esm/Container";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";

const LoginForm = () => {
  const authState = useSelector((state) => state.auth);
  const [emailInp, setEmailInp] = useState("");
  const [passwordInp, setPasswordInp] = useState("");
  const [cpasswordInp, setCpasswordInp] = useState("");
  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      console.log(e);
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
        console.log(response);
      }
    } catch (error) {
        //somthing went wrong
        console.log(error.response.data.message);
        console.log(`somthing went wrong`);
        // throw new Error(error.message);
    }
  };
  return (
    <Container className="p-5">
      <Row className="p-5">
        <Col className="p-5">
          <Form className="p-5" onSubmit={submitHandler}>
            <h3 className="text-center text-bg-success p-2 rounded-top-2">
              {authState.isLoginMode ? "Login" : "SignUp"}
            </h3>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={emailInp}
                onChange={(e) => setEmailInp(e.target.value)}
                placeholder="Enter email"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={passwordInp}
                onChange={(e) => setPasswordInp(e.target.value)}
                placeholder="Password"
              />
            </Form.Group>
            {!authState.isLoginMode && (
              <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  value={cpasswordInp}
                  onChange={(e) => setCpasswordInp(e.target.value)}
                  placeholder="Password"
                />
              </Form.Group>
            )}
            <div className="text-center  text-bg-success p-2 rounded-bottom-2">
              <Button
                variant="info"
                className="fs-4 fw-semibold m-2 text-primary w-25"
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
