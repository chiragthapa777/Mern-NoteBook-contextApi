import React,{ useContext} from "react";
import noteContext from "../context/notes/noteContext";

export default function NoteItem(props) {
  const {deleteNote ,editFunction} = useContext(noteContext);
  const { note } = props
  return (
    <>
      <div className="col-md-3">
        <div className="card my-3">
          <div className="card-body">
            <div className="d-flex align-item-center">
              <h5 className="card-title">{note.title}</h5>{" "}
              <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(note._id)}}></i>
              <i className="fa-solid fa-pen-to-square mx-2" onClick={(()=>{editFunction(note);})} ></i>
            </div>
            <p className="card-text">{note.description}</p>
            <p className="card-text" style={{color: "gray",fontSize:"small"}}>{note.tag} </p>
          </div>
        </div>
      </div>
    </>
  );
}
