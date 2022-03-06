import { useState, useEffect } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:8000";
  const noteInitial = [];
  const [notes, setnotes] = useState(noteInitial);
  
  //get all note of user=================================================
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
        },
    });
    const json = await response.json();
    setnotes(json);
  };

  //add a note=============================================================================
  const addNote = async (noteRec) => {
    // console.log("note is added");
    
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify(noteRec),
    });
    const json =await response.json();
    console.log(json);
    getNotes()
  };
  
  //delete note=============================================================================
  const deleteNote = async (id) => {
    console.log("deleting");
    
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
        },
      });
      const json = response.json();
      getNotes()
    };
    
    //edit note=============================================================================
    const [editadd, setEditadd] = useState({});
    const editFunction=(note)=>{
      setEditadd(note)
    }

    const editNote = async (id, title, description, tag) => {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();
    setEditadd({})
    getNotes()
  };

  return (
    <NoteContext.Provider
      value={{ notes, setnotes, addNote, deleteNote, editNote, getNotes ,editFunction,editadd}}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
