import React, { Component } from 'react'
import classes from './NewNote.module.css'
import SubmitCancelBtns from '../SubmitCancelBtns/SubmitCancelBtns'

class NewNote extends Component {
	componentDidMount(){
		console.log('componentDidMount')
	}
	
	render(){
		return (

				<form className={classes.newNote} onSubmit={(e)=>{ 
						this.props.history.replace('/')
						this.props.submitHandler(e)

						}}>

					<label>
						Title: <input type="text" id="title" onChange={this.props.titleHandler} value={this.props.stateCopy.currentTitle}/>
					</label>

					<br/>

					<label>
						Body: <textarea id="body" cols="30" rows="10" onChange={this.props.bodyHandler} value={this.props.stateCopy.currentBody}></textarea>
					</label>

					<br/>

					<SubmitCancelBtns  {...this.props} submitHandler = {this.props.submitHandler} cancelHandler = {this.props.cancelHandler}/>


				</form>
			)

		}

}


export default NewNote