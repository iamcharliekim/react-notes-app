import React, {Component} from 'react';
import './App.css';
import { Route,BrowserRouter } from 'react-router-dom';
import Navbar from './containers/Navbar/Navbar'
import HamburgerUnfold from './containers/HamburgerUnfold/HamburgerUnfold'
import NewNote from './components/NewNote/NewNote'
import NoteList from './containers/NoteList/NoteList'
import axios from 'axios'

class App extends Component {
	
	state = {
		unfold: false,
		notes: [],
		currentTitle: '',
		currentBody: '',
		submitted: false,
		currentID: '',
		editNote:false
	}

	componentDidMount() {
		console.log('componentDidMount')
		
		this.axiosGet()
		
	}
			
	componentDidUpdate(prevProps, prevState){
		console.log('componentDidUpdate')
		console.log('prevProps:',prevProps, 'prevState:', prevState)
		
	}

	axiosGet = () => {
		const URL = `https://react-notes-80e37.firebaseio.com/notes.json`
		
		axios.get(URL)
			.then(response => {
				if (response.data !== null){
				
					let fetchedNotesObj = response.data
					let fetchedKeys = Object.keys(fetchedNotesObj)
										
					let fetchedNotesArr = fetchedKeys.map(key => {
						return {
							...fetchedNotesObj[key],	
							dbKey: key
						}
					})
					
					this.setState({notes:fetchedNotesArr})
				}		
			})
		
	}

	hamburgerHandler = () => {
		this.setState((prevState, props) => {
			return {
					unfold: !prevState.unfold
			}
		})
		
	}

	postHandler = (newNote) => {
		const URL = `https://react-notes-80e37.firebaseio.com/notes.json`
		
		axios.post(URL, newNote)
			.then(response => {
				console.log(response)

		})
	}
	
	putHandler = (editedNote, id) => {
		const URL = `https://react-notes-80e37.firebaseio.com/notes/${id}.json`
		
		axios.put(URL, editedNote)
			.then(response => console.log(response))

		
	}

	submitHandler = (e) => {
			e.preventDefault();

			const stateCopy = {...this.state}

			let updated = new Date().getTime()

			let newNote = {
				title: stateCopy.currentTitle,
				body: stateCopy.currentBody,
				updated: updated,
			}

			stateCopy.notes.push(newNote)

			if (!this.state.editNote){

				this.setState({
					notes: stateCopy.notes,
					currentTitle: '',
					currentBody: '',
					submitted: true
				})
				
				this.postHandler(newNote)	

				console.log(this.state)
			} else {
				console.log(this.state.currentID)

				let targetIndex = stateCopy.notes.findIndex(note => note.dbKey === this.state.currentID)
				stateCopy.notes.splice(targetIndex, 1)
				
				this.setState({
					currentTitle: '',
					currentBody: '',
					currentID: '',
					editNote: false
				})
				
				this.putHandler(newNote, this.state.currentID)
				
				
			}

		
				
	}
	
	titleHandler = (e) => {
		this.setState({ currentTitle: e.target.value })
		console.log(this.state.currentTitle)
	}
	
	bodyHandler = (e) => {
		this.setState({ currentBody: e.target.value })
	}
	
	axiosDelete = (id) => {
		console.log('axiosDelete')
		const URL = `https://react-notes-80e37.firebaseio.com/notes/${id}.json`
		
		axios.delete(URL)
			.then(response => {
				console.log('axiosDelete finished')
				
		})
		
	}
	
	deleteNoteHandler = (e, id) => {
		console.log('deleteNoteHandler')
		
		e.stopPropagation();
		
		let notesCopy = [...this.state.notes]
		
		let targetNoteIndex = notesCopy.findIndex(note => {
			return id === note.dbKey
		})
		
		console.log(targetNoteIndex)
					
		notesCopy.splice(targetNoteIndex, 1)
		
		this.setState({notes: notesCopy})	
		
		//this.axiosDelete()
	}
	
	editNoteHandler = (id) => {
		console.log('editNote')
	
		let notesCopy = [...this.state.notes]	
		let targetNote = notesCopy.find(note=> note.dbKey === id)
		
		console.log(targetNote)
		this.setState({currentID: id, currentTitle: targetNote.title, currentBody: targetNote.body, editNote: true})
		
		
	}
	
	cancelHandler = () => {
		this.setState({
			currentTitle: '',
			currentBody: '',
			editNote: false
		})
	}
	
	render(){
		console.log('rendered')
		
		let hamburgerUnfold = null
		if (this.state.unfold){
			hamburgerUnfold = <HamburgerUnfold hamburgerHandler = {this.hamburgerHandler}/>
		}
		
		
		return (
			<BrowserRouter>
				<div className="App">
					<Navbar hamburgerUnfold = {this.hamburgerHandler}/>
					
					{hamburgerUnfold}
					
					<Route path="/addnote" render ={(props)=> <NewNote {...props} 
						titleHandler = {this.titleHandler}
						bodyHandler = {this.bodyHandler}
						submitHandler = {this.submitHandler}
						cancelHandler = {this.cancelHandler}
						stateCopy = {this.state}

					/>} />
										
					<Route path="/editnote/:id/" exact render ={ (props)=> <NewNote {...props} 
						fetchedNotes = {this.state.notes}
						deleteNoteHandler = {this.deleteNoteHandler}
						editNoteHandler = {this.editNoteHandler}
						titleHandler = {this.titleHandler}
						bodyHandler = {this.bodyHandler}
						stateCopy = {this.state}
						submitHandler = {this.submitHandler}
						cancelHandler = {this.cancelHandler}

						/> }
					/>	
					
					<Route path="/" exact render ={ (props)=> <NoteList {...props} 
						fetchedNotes = {this.state.notes}
						deleteNoteHandler = {(id) => this.deleteNoteHandler(id)}
						state = {this.state}
						editNoteHandler = {(e, id)=> this.editNoteHandler(e, id)}
						
					
						/> }
					/>	
					

		

				</div>
			</BrowserRouter>
		  );
	}
  
}

export default App;
