import React from 'react'
import classes from './SearchNotes.module.css'

const searchNotes = (props) => {
	
	return (
		<div className = {classes.searchNotes}>
			<label htmlFor="search-notes">
				Search: 
			</label>
			
			<input type="text" id="search-notes" onChange={props.searchNotesHandler} />
		</div>
	)
}

export default searchNotes