import React, { createContext, useReducer, useEffect } from 'react';

const initialState = {
  notes: JSON.parse(localStorage.getItem('notes')) || [],
};

export const NotesContext = createContext();

//reducer function
const notesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_NOTE':
      return { notes: [action.payload, ...state.notes] };
    case 'EDIT_NOTE':
      return {
        notes: state.notes.map((note) =>
          note.id === action.payload.id ? { ...note, ...action.payload } : note
        ),
      };
    case 'DELETE_NOTE':
      return { notes: state.notes.filter((note) => note.id !== action.payload) };
    default:
      return state;
  }
};

export const NotesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notesReducer, initialState);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(state.notes));
  }, [state.notes]);

  return (
    <NotesContext.Provider value={{ state, dispatch }}>{children}</NotesContext.Provider>
  );
};
