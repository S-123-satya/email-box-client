import React, { Component, useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import EditorComponent from "./EditorComponent";
import Button from "react-bootstrap/esm/Button";
import { useDispatch, useSelector } from "react-redux";
import { hideModel, sendMessage, setCurrentMessage, setCurrentMessageUser, showModel } from "../../store";
import axios from "axios";
import { Form, InputGroup, ListGroup } from "react-bootstrap";
import Suggestion from "../Suggestion";
import DeleteIcon from "../UI/DeleteIcon";
import { useNavigate } from "react-router-dom";

const Compose = () => {
  const emailState = useSelector((state) => state.email);
  const authState = useSelector((state) => state.auth);
  const modelState = useSelector((state) => state.model);
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const [emailInp, setEmailInp] = useState("");
  const [subjectInp, setSubjectInp] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const token = authState.token;
  const headers = { headers: { authorization: token } };
  useEffect(() => {
    const fetch = async () => {
      console.log(emailInp);
      if (emailInp) {
        const response = await axios.get(
          `http://localhost:5000/user/${emailInp}`
        );
        console.log(response);
        setSuggestion(response.data.users);
      }
    };
    let t = setTimeout(async () => {
      await fetch();
    }, 300);
    // setTimeout
    return () => {
      clearTimeout(t);
    };
    // console.log(response);
  }, [emailInp]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const obj = {
        message: emailState.currentEditorMessage,
        subject: subjectInp,
        ReceiverId: emailState.currentEditorMessageReceiver,
      };
      console.log(obj,'line 51 in index');
      const response = await axios.post(
        `http://localhost:5000/email`,
        obj,
        headers
      );
      console.log(response);
      dispatch(sendMessage({ ...response.data.message }));
      dispatch(setCurrentMessage(null));
      setEmailInp('');
      setSubjectInp('');
      navigate('/inbox');
    } catch (error) {
      console.log(error);
      //save message in archive here if something wrong
    }
  };
  return (
    <>
      <Form
        className="pt-4 p-2 m-1 bg-success rounded-2 fs-3"
      >
        <InputGroup className="mb-3 bg-light rounded-top-2">
          <InputGroup.Text id="basic-addon1">To</InputGroup.Text>
          <Form.Control
            type="email"
            value={emailInp}
            onChange={(e) => {
              setEmailInp(e.target.value);
            }}
            placeholder="Email"
            required
            onFocus={()=>dispatch(showModel())}
          />
        </InputGroup>
        {modelState.show && <ListGroup
            className="bg-light fs-5 position-fixed z-3"
            style={{ width: "75%" }}
          >
            {suggestion.map((item) => (
              <Suggestion
                key={item.id}
                email={item.email}
                onClick={(e) => {
                  console.log(item);
                  e.preventDefault();
                  setEmailInp(item.email);
                  dispatch(setCurrentMessageUser(item.id))
                  dispatch(hideModel());
                }}
              />
            ))}
          </ListGroup>}
        <InputGroup className="mb-3 bg-light rounded-top-2">
          <InputGroup.Text id="basic-addon2">Subject</InputGroup.Text>
          <Form.Control
            type="text"
            value={subjectInp}
            onChange={(e) => setSubjectInp(e.target.value)}
            placeholder="Subject"
          />
        </InputGroup>
        <div
          style={{ height: "500px" }}
          className="  text-bg-success border-top border-2 border-light pt-2 rounded-bottom-2"
        >
          <EditorComponent />
          <div className="bg-opacity-10 text-end">
            <Button
              variant="info"
              className="fs-5 fw-semibold mx-2 bg-light w-md-50"
              type="submit"
              onClick={submitHandler}
            >
              Send
            </Button>
          </div>
        </div>
      </Form>
    </>
  );
};

export default Compose;
