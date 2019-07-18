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
		filteredNotes: [],
		currentTitle: '',
		currentBody: '',
		submitted: false,
		currentID: '',
		editNote:false,
		search: false
	}

	componentDidMount() {
		console.log('componentDidMount')
		
		this.axiosGet()
		
	}
			
	componentDidUpdate(prevProps, prevState){

		console.log('componentDidUpdate')
		console.log('this.state', this.state.notes, 'prevState:', prevState.notes)
		 
		let equal = this.state.notes.length === prevState.notes.length && this.state.notes.every((e, i) => e.updated === prevState.notes[i].updated);
		
		console.log(equal)

		if (!equal){
			this.axiosGet()
		}
		
	
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
					
					console.log(fetchedNotesArr)
					
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
		let notesCopy = [...this.state.notes]
		
		let postedNoteIndex = notesCopy.findIndex(note => note.updated === newNote.updated)
		
		console.log(notesCopy)
		
		const URL = `https://react-notes-80e37.firebaseio.com/notes.json`
		
		axios.post(URL, newNote)
			.then(response => {
				console.log(response)
			
				notesCopy[postedNoteIndex].dbKey = response.data.name
							
				this.setState({
					notes: notesCopy
				})
			
				console.log(this.state.notes)

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


			if (!this.state.editNote){
				stateCopy.notes.push(newNote)

				this.setState({
					notes: stateCopy.notes,
					currentTitle: '',
					currentBody: '',
					currentID: '',
					editNote: false
				})
				
				this.postHandler(newNote)	

				console.log(this.state)
			} else {
				
				let targetIndex = stateCopy.notes.findIndex(note => note.dbKey === this.state.currentID )
				
				stateCopy.notes[targetIndex] = newNote
				
				this.setState({
					notes: stateCopy.notes,
					currentTitle: '',
					currentBody: '',
					currentID: '',
					editNote: false,
					
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
	
	axiosDelete = (e, id) => {
		e.stopPropagation()
		e.preventDefault()
		console.log('axiosDelete', id)
		const URL = `https://react-notes-80e37.firebaseio.com/notes/${id}.json`
		
		axios.delete(URL)
			.then(response => {
			
				this.deleteNoteHandler(e, id)
				console.log('axiosDelete finished')
				
		})
		
	}
	
	deleteNoteHandler = (e, id) => {
		console.log('deleteNoteHandler', id)
		
		let notesCopy = [...this.state.notes]
		
		let targetNoteIndex = notesCopy.findIndex(note => {
			return id === note.dbKey
		})
		
		console.log(targetNoteIndex)
					
		notesCopy.splice(targetNoteIndex, 1)
		
		this.setState({notes: notesCopy})	
		
	}
	
	editNoteHandler = (id) => {
		console.log('editNote', id)
	
		let notesCopy = [...this.state.notes]	
		
		console.log(notesCopy, id)

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
	
	clearNotesHandler = () => {
		console.log('clear')
		
		this.setState({notes: []})

		const URL = `https://react-notes-80e37.firebaseio.com/notes.json`
			
		axios.delete(URL)
			.then(response => console.log(response))
	}
	
	blurHandler = () => {
		this.setState({search:false})
	}
	
	searchNotesHandler = (e) => {
		
		const notesCopy = [...this.state.notes]
		let searchQuery = e.target.value
		
		let searchResult = notesCopy.filter(note => {
			return note.title.includes(searchQuery) || note.body.includes(searchQuery)
		})
		
		console.log(searchResult)
		
		this.setState({
				notes: searchResult
		})
	}
	
	
	render(){
		console.log('rendered')
		
		let hamburgerUnfold = null
		if (this.state.unfold){
			hamburgerUnfold = <HamburgerUnfold hamburgerHandler = {this.hamburgerHandler}
												clearNotesHandler = {this.clearNotesHandler}
												searchNotesHandler = {this.searchNotesHandler}
												blurHandler = {this.blurHandler}
								/>
		}
		
		
		return (
			<BrowserRouter>
				<div className="App">
					<Navbar hamburgerUnfold = {this.hamburgerHandler}
							clearNotesHandler = {this.clearNotesHandler}
					/>
					
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
						filteredNotes = {this.state.filteredNotes}
						deleteNoteHandler = {(e, id) => this.axiosDelete(e, id)}
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
