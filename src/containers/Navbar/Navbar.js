import React from 'react'
import classes from './Navbar.module.css'

import Logo from '../../components/Logo/Logo'
import Hamburger from '../../components/Hamburger/Hamburger'

const navbar = (props) => {
	
	return (
		<nav className={classes.navbar}>
			<Logo/>
			<Hamburger hamburgerUnfold = {props.hamburgerUnfold}/>
		</nav>
	
	)
}

export default navbar