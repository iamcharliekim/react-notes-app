import React, {Component} from 'react';
import classes from './SubmitCancelBtns.module.css'


class SubmitCancelBtns extends Component {
	
	cancelHandler = () => {
		this.props.cancelHandler();
		this.props.history.replace('/')
	}
	
	render() {
			return (
				<div className={classes.submitCancelBtns}>
					<button type="submit">Submit</button>
						<button onClick={this.cancelHandler}>Cancel</button>
				</div>
				)
		
	}
}


export default SubmitCancelBtns