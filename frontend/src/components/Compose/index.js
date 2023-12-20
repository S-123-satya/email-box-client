import React, { Component, useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import EditorComponent from "./EditorComponent";
import Button from "react-bootstrap/esm/Button";
import { useDispatch, useSelector } from "react-redux";
import { hideModel, sendMessage, setCurrentMessage, showModel } from "../../store";
import axios from "axios";
import { Form, InputGroup, ListGroup } from "react-bootstrap";
import Suggestion from "../Suggestion";

const Compose = () => {
  const emailState = useSelector((state) => state.email);
  const authState = useSelector((state) => state.auth);
  const modelState = useSelector((state) => state.model);
  const dispatch = useDispatch();
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
        receiver: emailInp,
      };
      const response = await axios.post(
        `http://localhost:5000/email`,
        obj,
        headers
      );
      console.log(response);
      dispatch(sendMessage({ ...response.data }));
      dispatch(setCurrentMessage(null));
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
                  e.preventDefault();
                  setEmailInp(item.email);
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
            <Button
              variant="info"
              className="fs-5 fw-semibold mx-2 bg-light w-md-50"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-trash"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
              </svg>
            </Button>
          </div>
        </div>
      </Form>
    </>
  );
};

export default Compose;
