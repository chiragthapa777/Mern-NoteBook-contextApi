import { useState } from "react";
import AlertContext from "./AlertContext";

const AlertState = (props) => {
    let initiaAlert=false
  const [alert, setAlert] = useState(initiaAlert);
  const [msg, setMsg] = useState("");

  const alertCall=(message)=>{
    setMsg(message)
    setAlert(true)
  }

  return (
    <AlertContext.Provider value={{ alert, setAlert ,alertCall, msg}}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
