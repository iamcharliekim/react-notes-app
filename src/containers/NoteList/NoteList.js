import React from 'react';
import classes from './NoteList.module.css'
import {Link} from 'react-router-dom'
import NoteDiv from '../../components/NoteDiv/NoteDiv'

const noteList = (props) => {
	let fetchedNotes = props.fetchedNotes
		
	let fetchedNotesList = fetchedNotes.map(note =>{
		return <Link to={"/editnote/" + note.updated } key ={note.updated} ><NoteDiv {...props} title={note.title} updated={note.updated} body={note.body}  deleteNoteHandler = {(e, id) => props.deleteNoteHandler(e, id)} editNoteHandler = {(id)=>props.editNoteHandler(id)} dbKey = {note.dbKey}/></Link>})
	
	return (
		<div className={classes.noteList}>
			{fetchedNotesList}
		</div>
	)
}

export default noteList