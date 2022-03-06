import React,{ useContext} from "react";
import AlertContext from "../context/alert/AlertContext";

export default function Alert(props) {
  const { setAlert, msg}=useContext(AlertContext)
  const handleClick=()=>{
    setAlert(false)
  }
  return (
    <div>
      <div
        className="alert alert-warning alert-dismissible fade show"
        style={{
          position: "absolute",
          width: "100%",
          opacity: "0.7",
        }}
        role="alert"
      >
        {msg}
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
          onClick={handleClick}
        ></button>
      </div>
    </div>
  );
}
