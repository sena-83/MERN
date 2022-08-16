import React from "react";
import "./App.css";
const createHistory = require("history").createBrowserHistory;

const Modal = (props) => {
  if (!props.show) {
    if (props.redirectionRequired) {
      let history = createHistory();
      history.push(props.redirectURL);
      let pathUrl = window.location.href;
      window.location.href = pathUrl;
    }
    return null;
  }
  return (
    <div className="modal" onClick={props.onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation}>
        <div className="modal-header">
          <h4 className="modal-title"> {props.modalTitle}</h4>
        </div>
        <div className="modal-body">{props.modalMessage}</div>
        <div className="modal-footer">
          <button onClick={props.onClose} className="btn btn-primary">
            Close{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
