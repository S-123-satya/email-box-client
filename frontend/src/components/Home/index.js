import React from "react";
import Header from "../Header";
import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import SideBar from "../SideBar";
import { useSelector } from "react-redux";

const Home = () => {
  const authState=useSelector(state=>state.auth);
  return (
    <div>
      <Container className=" min-vh-100" fluid>
        <Header  />
        <Row className="h-100">
         {authState.isLogin && <Col md={2} className="border  border-black">
            <SideBar/>
          </Col>}
          <Col className="border  border-black">
            <Outlet />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
