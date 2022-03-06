import React, { useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";

export default function Notes() {
    const {notes, setnotes, addnote, getNotes} = useContext(noteContext);
    useEffect(() => {
        getNotes();
      },[]);
    
    // console.log(notes);
    
  return <div className="my-3 row">
      
      {notes.length===0?<h1>You Don't have any notes</h1>:<h1>Your notes</h1>}
      
      {notes.map((note)=>{
        return(
          <NoteItem key={note._id} note={note}/>
        )
      })}
  </div>;
}
