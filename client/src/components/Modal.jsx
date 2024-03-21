import React from "react";
import ReactDOM from "react-dom";

const Backdrop = ({ handleCloseModal }) => {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 top-0 z-40 bg-neutral-900/70"
      onClick={handleCloseModal}
    ></div>
  );
};

const Modal = ({ handleCloseModal, children }) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop handleCloseModal={handleCloseModal} />,
        document.getElementById("root-backdrop"),
      )}
      {ReactDOM.createPortal(children, document.getElementById("root-overlay"))}
    </React.Fragment>
  );
};

export default Modal;
