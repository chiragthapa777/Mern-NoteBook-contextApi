import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import Notes from "./Notes";
import AddNote from "./AddNote";

export default function Home() {
  const {notes, setnotes} = useContext(noteContext);
  return (
    <>
    <div className="container my-3">
    <AddNote />
    </div>
    <div className="container my-3">
      <Notes />
    </div>
    </>
    
  );
}
