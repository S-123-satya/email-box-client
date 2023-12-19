import React, { Component, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import EditorComponent from "./EditorComponent";
import Button from "react-bootstrap/esm/Button";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage, setCurrentMessage } from "../../store";
import axios from "axios";
import { Form, InputGroup } from "react-bootstrap";

const Compose = () => {
  const emailState = useSelector((state) => state.email);
  const dispatch = useDispatch();
  const [emailInp, setEmailInp] = useState("");
  const [subjectInp, setSubjectInp] = useState("");
  const [cpasswordInp, setCpasswordInp] = useState("");
  const submitHandler = async () => {
    try {
      const obj = {
        message: emailState.currentEditorMessage,
      };
      const response = await axios.post(`http://localhost:5000/email`, obj);
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
        onSubmit={submitHandler}
      >
        <InputGroup className="mb-3 bg-light rounded-top-2">
          <InputGroup.Text id="basic-addon1">To</InputGroup.Text>
          <Form.Control
            type="email"
            value={emailInp}
            onChange={(e) => setEmailInp(e.target.value)}
            placeholder="Email"
            required
          />
        </InputGroup>
        <InputGroup className="mb-3 bg-light rounded-top-2">
          <InputGroup.Text id="basic-addon2">Subject</InputGroup.Text>
          <Form.Control
            type="text"
            value={subjectInp}
            onChange={(e) => setSubjectInp(e.target.value)}
            placeholder="Subject"
          />
        </InputGroup>
        {/* <Form.Group
          className="mx-2 bg-light rounded-top-2"
          controlId="formBasicEmail"
        >
          <Form.Control
            type="email"
            value={emailInp}
            onChange={(e) => setEmailInp(e.target.value)}
            placeholder="Enter email"
            required
          />
        </Form.Group> */}

        {/* <Form.Group
          className="mx-2  bg-light rounded-bottom-2"
          controlId="formBasicConfirmPassword"
        >
          <Form.Label className="m-1">Subject</Form.Label>
          <Form.Control
            type="text"
            value={subjectInp}
            onChange={(e) => setSubjectInp(e.target.value)}
            placeholder="Password"
          />
        </Form.Group> */}
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
            >
              Send
            </Button>
            <Button
              variant="info"
              className="fs-5 fw-semibold mx-2 bg-light w-md-50"
              type="submit"
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
