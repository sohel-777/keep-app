import React, { useContext, useState } from "react";
import Note from "../Note/Note";
import { NotesContext } from "../../context/NotesContext";
import { CiGrid41 } from "react-icons/ci";
import { CiBoxList } from "react-icons/ci";
import "./styles.css"

const NoteList = () => {
  const { state } = useContext(NotesContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // 'list' or 'grid'

  const filteredNotes = state.notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  //function for changing view mode
  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === "grid" ? "list" : "grid"));
  };

  return (
    <div>
      <div className="searchViewContainer">
        <input
          className="search-bar"
          type="text"
          placeholder="Search your notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="view-toggle" onClick={toggleViewMode}>
          {viewMode === "list" ? <div className="viewIcon"><CiBoxList /></div>  : <div className="viewIcon"><CiGrid41 /></div>}
        </div>
      </div>

      <div className={`note-container ${viewMode}`}>
        {filteredNotes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
};

export default NoteList;
