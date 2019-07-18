import React from 'react'
import classes from './ClearNotes.module.css'

const clearNotes = (props) => {
	
	return (
		<div className={classes.clearNotes} onClick={props.clearNotesHandler}>
			- Clear Notes
		</div>
	
	)
}

export default clearNotes