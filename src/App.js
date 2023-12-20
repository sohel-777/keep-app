import React from 'react';
import NoteList from './components/NoteList/NoteList';
import NoteForm from './components/NoteForm/NoteForm';
import { NotesProvider } from './context/NotesContext';
import './App.css';

const App = () => {
  return (
    <NotesProvider>
      <div className="container">
        <h1>Keep App</h1>
        <NoteForm />
        <NoteList />
      </div>
    </NotesProvider>
  );
};

export default App;
