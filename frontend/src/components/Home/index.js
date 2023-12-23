import React, { useEffect } from "react";
import Header from "../Header";
import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import SideBar from "../SideBar";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { receiveMessage } from "../../store";

const Home = () => {
  const authState=useSelector(state=>state.auth);
  const emailState=useSelector(state=>state.email);
  const dispatch = useDispatch();
  const token = authState.token;
  const headers = { headers: { authorization: token } };
  useEffect(()=>{
  setTimeout(()=>{
    const fetch = async (id) => {
      const response = await axios.get(
        `http://localhost:5000/email/${id}`,headers
      );
      console.log(response);
      response.data.messages.map(m=>dispatch(receiveMessage({...m})))
    };
    let len = emailState.receivedMessages.length;
    let id = len==0?0:emailState.receivedMessages[len - 1].id;
    if(authState.isLogin){
      fetch(id);
    }
  },2000);
},[]);
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
