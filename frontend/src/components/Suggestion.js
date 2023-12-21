import ListGroup from "react-bootstrap/ListGroup";
import React from "react";

const Suggestion = (props) => {
  return (
    <ListGroup.Item action onClick={props.onClick}>
      {props.email}
    </ListGroup.Item>
  );
};

export default Suggestion;
