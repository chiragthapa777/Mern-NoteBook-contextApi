import React, { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import AlertContext from "../context/alert/AlertContext";
import AuthContext from "../context/auth/AuthContext";

export default function Login(props) {
const {alertCall}=useContext(AlertContext)
const {setUser}=useContext(AuthContext)

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const history= useNavigate()

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const response = await fetch(`http://localhost:8000/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          },
          body:JSON.stringify({email, password})
      });
      const json = await response.json();
      if(json.authtoken)
      {
        alertCall("logged in succesfully")
        localStorage.setItem('token', json.authtoken)
        setUser(true)
        history("/")
      }
      else{
        alertCall("wrong credentials")
      }
      
    }


  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email 
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <button type="submit"  className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
