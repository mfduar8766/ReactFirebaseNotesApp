import React, { Component } from 'react';
import './App.css';
import Note from './Components/Note/Note';
import NoteForm from './Components/NoteForm/NoteForm';
import {DB_Config} from './Config';
import firebase from 'firebase/app';
import 'firebase/database';

class App extends Component {

  constructor(props) {
    super(props);
    this.app = firebase.initializeApp(DB_Config);
    this.database = this.app.database().ref().child('notes');
    this.state = {
      notes: [],
    };
  }

  componentWillMount() {
    const previousNotes = this.state.notes;

    this.database.on('child_added', snap => {
      previousNotes.push({
        id: snap.key,
        noteContent: snap.val().noteContent,
      })
      this.setState({
        notes: previousNotes
      });
    });

    this.database.on('child_removed', snap => {
      for ( let i=0; i<previousNotes.length; i++) {
        if (previousNotes[i].id === snap.key) {
          previousNotes.splice(i, 1);
        }
      }
      this.setState({
        notes: previousNotes
      });
    });
  } 

  addNote = (note) => {
    this.database.push().set({noteContent: note});
  }

  removeNote = (noteId) => {
    this.database.child(noteId).remove();
  }

  render() {
    return (
      <div className="notesWrapper">
      <div className="notesHeader">
        <div className="heading">React Firebase To-Do List</div>
      </div>
      <div className="notesBody">
        {
          this.state.notes.map((note) => {
            return (
              <Note 
              removeNote={this.removeNote.bind(this)}
              noteContent={note.noteContent} 
              noteId={note.id} 
              key={note.id} />
            )
          })
        }
      </div>
      <div className="notesFooter">
        <NoteForm createNote={this.addNote.bind(this)}/>
      </div>
    </div>
    );
  }
}

export default App;
