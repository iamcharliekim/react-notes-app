import React from 'react'
import classes from './AddNote.module.css'
import { Link } from 'react-router-dom'

const addNote = (props) => {
	
	return (
		<Link to="/addnote" className={classes.addNote} onClick = {props.hamburgerHandler}>
			<div >
				+ Add Note
			</div>
		</Link>
	)
}

export default addNote