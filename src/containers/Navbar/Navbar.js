import React from 'react'
import classes from './Navbar.module.css'

import Logo from '../../components/Logo/Logo'
import Hamburger from '../../components/Hamburger/Hamburger'

const navbar = (props) => {
	
	return (
		<nav className={classes.navbar}>
			<Logo/>
			<Hamburger hamburgerUnfold = {props.hamburgerUnfold}
						clearNotesHandler = {props.clearNotesHandler}
			/>
		</nav>
	
	)
}

export default navbar