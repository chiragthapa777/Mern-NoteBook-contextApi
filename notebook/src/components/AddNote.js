import React, { useContext, useState, useEffect } from "react";
import noteContext from "../context/notes/noteContext";

export default function AddNote() {
  const { addNote, editadd, editNote } = useContext(noteContext);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tag, setTag] = useState("");
  const handleClick = (e) => {
    e.preventDefault();

    if (editadd.hasOwnProperty("_id")) {
      editNote(editadd._id, title, desc, tag);

    }
    else{
      addNote({
        title,
        description: desc,
        tag,
      });

    }

    setTag("");
    setDesc("");
    setTitle("");
  };
  useEffect(() => {
    if (editadd.hasOwnProperty("_id")) {
      setTag(editadd.tag);
      setDesc(editadd.description);
      setTitle(editadd.title);
    }
  }, [editadd]);

  return (
    <>
      <h1>Add a note</h1>
      <form>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            value={desc}
            type="text"
            className="form-control"
            id="description"
            placeholder="Enter description"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="tag">Tag</label>
          <input
            value={tag}
            type="text"
            className="form-control"
            id="tag"
            placeholder="Enter tag"
            onChange={(e) => setTag(e.target.value)}
          />
        </div>
        <button onClick={handleClick} className="btn btn-primary my-2">
          {editadd._id?"Update":"Add Note"}
        </button>
      </form>
    </>
  );
}
