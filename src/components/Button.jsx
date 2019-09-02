import React from "react";

export default props => {
  return (
    <button className={`btn btn-dark btn-lg ${props.classe !== undefined ? props.classe: ''}`} onClick={e => props.click(props.label)}>
      {props.label}
    </button>
  );
};
