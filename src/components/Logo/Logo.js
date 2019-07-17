import React from 'react'
import classes from './Logo.module.css'
import {Link} from 'react-router-dom'

const logo = (props) => {
	
	return (
		<Link to="/">
			<header className={classes.logo}>
				<h1>React Notes</h1>
			</header>	
		</Link>
	
	)
}

export default logo