import ListGroup from "react-bootstrap/ListGroup";
import React from "react";

const Suggestion = (props) => {
  const alertClicked = () => {
    alert("You clicked the third ListGroupItem");
  };
  return (
    
      
      <ListGroup.Item action onClick={props.onClick} >
        {props.email}
      </ListGroup.Item>
      
    
      
  );
};

export default Suggestion;
