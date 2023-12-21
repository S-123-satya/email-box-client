import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DeleteIcon from "../UI/DeleteIcon";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteMessage, unSetMessageDetailReceive } from "../../store";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import axios from "axios";

const MessageDetail = (props) => {
  const authState = useSelector((state) => state.auth);
  const { id } = useParams();
  const token = authState.token;
  const dispatch=useDispatch();

  const headers = { headers: { authorization: token } };
  const [curMessage, setCurMessage] = useState(null);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const deleteHandler=async(e)=>{
    e.preventDefault();
    const response = await axios.delete(
      `http://localhost:5000/email/${id}`,
      headers
    );
    dispatch(deleteMessage({id}));
  }
  const emailState = useSelector((state) => state.email);
  console.log(id);
  useEffect(() => {
    if (emailState.messageDetailReceive) {
      console.log(emailState.receivedMessages);
      setCurMessage(
        ...emailState.receivedMessages.filter((m) => {
          console.log(m);
          if (m.id == id) {
            setEditorState(EditorState.createWithContent(convertFromRaw(m.message)));
            // setEditorState(m.message)
            return m;
          }
        })
      );
    } else {
      console.log(emailState.sentMessages);
      const cur = emailState.sentMessages.filter((m) => {
        console.log(m);
        console.log(id);
        if (m.id == id) {
          console.log(m);
          return m;
        }
      });
      console.log(cur);
      setCurMessage(...cur);
    }
    return () => dispatch(unSetMessageDetailReceive());
  }, []);
  console.log(curMessage);
  const updateTextDescription = async (state) => {
    await setEditorState(state);

    const data = convertToRaw(editorState.getCurrentContent());
  };
  return (
    <>
      {curMessage && (
        <div>
          <div>
            <DeleteIcon onclick={deleteHandler}/>
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
                class="bi bi-box-arrow-down"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M3.5 10a.5.5 0 0 1-.5-.5v-8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 0 0 1h2A1.5 1.5 0 0 0 14 9.5v-8A1.5 1.5 0 0 0 12.5 0h-9A1.5 1.5 0 0 0 2 1.5v8A1.5 1.5 0 0 0 3.5 11h2a.5.5 0 0 0 0-1z"
                />
                <path
                  fill-rule="evenodd"
                  d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708z"
                />
              </svg>
            </Button>
          </div>
          <div className="fs-4 fw-semibold m-1"> {curMessage.subject}</div>
          <div>
            <sapn>{curMessage.SenderId}</sapn>
            <sapn>
              {"<"}
              {curMessage.SenderId}
              {">"}
            </sapn>
            <span>10:30</span>
            <p>
              To:<span>{curMessage.ReceiverId}</span>
            </p>
            <div className="disabled">
              <Editor
              toolbarHidden
              className="disabled"
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
              />
            </div>
          </div>
          {/* <MessageArea/> */}
        </div>
      )}
    </>
  );
};
export default MessageDetail;
