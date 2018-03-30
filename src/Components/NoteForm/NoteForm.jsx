import React, { Component } from 'react';
import './NoteForm.css';

class NoteForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            newNoteContent: ''
         };
    }

    handleUserInput = (event) => {
        this.setState({
            newNoteContent: event.target.value,
        });
    }

    writeNote(){
        // call a method that sets the noteContent for a note to
        // the value of the input
        this.props.createNote(this.state.newNoteContent);

        // Set newNoteContent back to an empty string.
        this.setState({
            newNoteContent: '',
        });
    }

    render() { 
        return ( 
        <div className="formWrapper">
            <input className="noteInput" 
            placeholder="Add new note..." 
            value={this.state.newNoteContent}
            onChange={this.handleUserInput.bind(this)}/>
            <button onClick={this.writeNote.bind(this)} className="noteButton">Add a Note</button>
        </div>
     );
    }
}
 
export default NoteForm;