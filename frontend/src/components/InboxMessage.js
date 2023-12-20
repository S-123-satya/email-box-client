import React from "react";

const InboxMessage = (props) => {
  console.log(props.message);
  return (
    <div className="border border-1 d-flex rounded-2" style={{height:'45px'}}>
      <div className="overflow-hidden fs-5 fw-semibold m-1" style={{maxWidth:'30%'}}>{props.message.subject} </div>
      <div className=" overflow-hidden me-auto px-2 my-auto" >
        {props.message.message.blocks[0].text}
      </div>
      <div className="my-auto justify-content-end" style={{width:'5%'}}>10:30 </div>
    </div>
  );
};

export default InboxMessage;
