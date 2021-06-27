import React, {Component} from 'react';
import { useHistory } from "react-router-dom";

function ChangeTheater(props) {
  let history = useHistory();
  function handleClick() {
    history.push(`/theater/${props.theater_id}/1`);
  }

  return (
    <button
        type="button"
        value="Submit"
        className="form-button"
        onClick={handleClick}>
     Submit
    </button>
  )
}

export default ChangeTheater;
