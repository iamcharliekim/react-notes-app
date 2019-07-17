import React from 'react'
import classes from './HamburgerUnfold.module.css'
import AddNote from '../../components/AddNote/AddNote'
import ClearNotes from '../../components/ClearNotes/ClearNotes'
import SearchNotes from '../../components/SearchNotes/SearchNotes'

const hamburgerUnfold = (props) => {
	
	return (
		<div className={classes.hamburgerUnfold}>
			<AddNote hamburgerHandler = {props.hamburgerHandler}/>
			<ClearNotes/>
			<SearchNotes/>
		</div>
	
	)
}

export default hamburgerUnfold 