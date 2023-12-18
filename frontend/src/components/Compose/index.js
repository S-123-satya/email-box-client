import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import EditorComponent from "./EditorComponent";
import Button from "react-bootstrap/esm/Button";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../store";
import moduleName from 'axios';
import axios from "axios";

const Compose = () => {
    const emailState=useSelector(state=>state.email);
    const dispatch=useDispatch()
    const emailSendHandler=async()=>{
        try {
            
            const obj={
                message:emailState.currentEditorMessage,
            }
            console.log(obj);
            console.log(`21 in compose index`);
            const response=await axios.post(`http://localhost:5000/email`,obj);
            console.log(`23 in compose index`);
            console.log(response);
            dispatch(sendMessage({...response.data}))
        } catch (error) {
            console.log(`27 in compose index error`);
            console.log(error);
        }
    }
  return (
    <>
      <EditorComponent />
      <Button variant="success" className="" onClick={emailSendHandler}>
        send
      </Button>
    </>
  );
};

export default Compose;
