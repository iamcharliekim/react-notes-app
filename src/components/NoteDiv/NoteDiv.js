import React, { Component} from 'react';
import classes from './NoteDiv.module.css'

class NoteDiv extends Component {
	
	componentDidMount(){
		console.log(this.props)

	}
	
	backHandler = () =>{
		this.props.history.replace('/')
	}
	
	render(){
		let title = this.props.title
		let updated = new Date(this.props.updated).toString()
		let body = this.props.body

		return (
			<div className = {classes.noteDiv} id={this.props.updated} onClick = {()=> this.props.editNoteHandler(this.props.dbKey)}>
				<h1>{title}</h1>
				<span>{updated}</span>
				<p>{body}</p>
				<button onClick={(e)=> {
						this.props.deleteNoteHandler(e, this.props.dbKey)
					}}>Delete</button>

			</div>

		)

		
	}

}

export default NoteDiv