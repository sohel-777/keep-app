import React, { useContext, useState } from "react";
import ColorPicker from "../ColorPicker/ColorPicker";
import { NotesContext } from "../../context/NotesContext";
import "./styles.css"

const NoteForm = () => {
  const { dispatch } = useContext(NotesContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [noteColor, setNoteColor] = useState("#ffffff");
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() !== "" || content.trim() !== "") {
      dispatch({
        type: "ADD_NOTE",
        payload: {
          title,
          content,
          color: noteColor,
          id: new Date().toISOString(), // Using current date as ID
        },
      });
      setTitle("");
      setContent("");
      setNoteColor("#ffffff");
      setShowColorPicker(false); // Hide color picker after submitting the form
    }
  };

  return (
    <form className="note-form" onSubmit={handleSubmit} style={{ backgroundColor: noteColor }} >
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="bottom-save-div">
        <button type="submit">Add Note</button>
        <div className="color-picker-container">
          <button
            type="button"
            className="color-picker-icon"
            onClick={() => setShowColorPicker(!showColorPicker)}
          >
            🎨
          </button>
          {showColorPicker && (
            <ColorPicker color={noteColor} onChange={setNoteColor} />
          )}
        </div>
      </div>
    </form>
  );
};

export default NoteForm;
