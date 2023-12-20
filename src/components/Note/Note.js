import React, { useContext, useState } from "react";
import ColorPicker from "../ColorPicker/ColorPicker";
import { NotesContext } from "../../context/NotesContext";
import "./styles.css"

const Note = ({ note }) => {
  const { dispatch } = useContext(NotesContext);
  const [isEditing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedContent, setEditedContent] = useState(note.content);
  const [noteColor, setNoteColor] = useState(note.color || "#ffffff");
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    dispatch({
      type: "EDIT_NOTE",
      payload: {
        id: note.id,
        title: editedTitle,
        content: editedContent,
        color: noteColor,
      },
    });
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
    setEditedTitle(note.title);
    setEditedContent(note.content);
    setNoteColor(note.color);
  };

  const handleDelete = () => {
    const deleteAlertText = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (deleteAlertText) {
      dispatch({ type: "DELETE_NOTE", payload: note.id });
    }
  };

  return (
    <div className="note" style={{ backgroundColor: noteColor }}>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <div className="bottom-save-div">
            <button onClick={handleSave}>Save</button>
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
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className="note-content">
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <div><button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button></div>
          
        </div>
      )}
    </div>
  );
};

export default Note;
