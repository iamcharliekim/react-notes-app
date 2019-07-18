import React from 'react';
import classes from './NoteList.module.css'
import NoteDiv from '../../components/NoteDiv/NoteDiv'
import {Link} from 'react-router-dom'

const noteList = (props) => {
	let searchSignal = props.state.search
	let fetchedNotes = props.fetchedNotes
	let filteredNotes = props.filteredNotes
	
	let notes	
	
	
	 let notesList = fetchedNotes.map(note =>{
		return <Link to={"/editnote/" + note.updated} key ={note.updated}><NoteDiv {...props} title={note.title} updated={note.updated} body={note.body}  deleteNoteHandler = {(e, id) => props.deleteNoteHandler(e, id)} editNoteHandler = {(id)=>props.editNoteHandler(id)} dbKey = {note.dbKey} /></Link>})
	
	return (
		<div className={classes.noteList}>
			{notesList}
		</div>
	)
}

export default noteList