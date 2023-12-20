import React, { Component, useState } from "react";
import { EditorState, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentMessage } from "../../store";
import draftToHtml from 'draftjs-to-html';
const content = {
  entityMap: {},
  blocks: [
    {
      key: "637gr",
      text: "Initialized from content state.",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
  ],
};

const EditorComponent = () => {
  const dispatch = useDispatch();
  const [edit,setEdit]=useState(EditorState.createEmpty());
  const emailState = useSelector((state) => state.email);
  const onContentStateChange = (newstate) => {
    setEdit(newstate)
    dispatch(setCurrentMessage({ ...edit }));
  };

  // const { contentState } = this.state;
  // console.log(contentState);//our data is in contentState
  console.log(emailState.currentEditorMessage);
  console.log(content.getCurrentContent);
  console.log(edit);
  console.log(draftToHtml(edit))
  return (
    <div style={{ height: "90%" }} className="overflow-auto">
      <Editor
        toolbarStyle={{ position: "sticky", top: 0 }}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onContentStateChange={onContentStateChange}
      />
      <textarea
        disabled
        value={draftToHtml(edit)}
      />
    </div>
  );
};

// const mapStateToProps=state=>{
//   return {currentEmail:state.email.currentEditorMessage}
// }
// const mapDispachToProps=dispatch=>{
//   return {setCurrentMessage:()=>dispatch(setCurrentMessage())}
// }

// export default connect(mapStateToProps,mapDispachToProps)(EditorComponent);
export default EditorComponent;
