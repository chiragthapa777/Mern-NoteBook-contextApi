import React, { useEffect, useState, useContext, } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";

import AlertContext from "./context/alert/AlertContext";
import AuthContext from "./context/auth/AuthContext";

export default function App() {


  
  

  const {alert}=useContext(AlertContext)
  const {user}=useContext(AuthContext)

  return (
    <>
      <NoteState>
    

        <BrowserRouter>
          <Navbar />
          {(alert===true) && <Alert />}

          <Routes>
            {
              user && (
                <Route>

                  <Route path="/" element={<Home  />} />
                  <Route path="/about" element={<About />} />
                </Route>
              )
            }
            <Route path="/login" element={<Login  />} />
            <Route path="/signup" element={<Signup  />} />
            <Route path="*" element={<Navigate to={user? "/":"/login"}/>  }/>
          </Routes>
        </BrowserRouter>

      </NoteState>
    </>
  );
}
