import React from 'react';

import '../css/card-manager.css'

class CardEdit extends React.Component{
	constructor(props){
		super(props);
		console.log(props);
	}
	
	handleDelete = (e) => {
		console.log("handleDelete",e.target);
		this.props.deleteCard(this.props.card);
	
	
	}
	handleEdit = (e) => {
		console.log("handleEdit",e);
		this.props.editCard(this.props.card);

	
	}
	render(){
		return (
			<div className="cardEdit">
				<div className="fieldContainer">
					<div className="fieldName">
						Question
					</div>
				{this.props.card.question}
				</div>
				<div className="fieldContainer">
				<div className="fieldName">
					Answer
					</div>
				{this.props.card.answer}
				</div>
				<div className="actionContainer">
					<button onClick= {this.handleDelete} >Delete</button>
					<button onClick= {this.handleEdit}>Edit</button>
				</div>
			</div>
		);
	}
}

export default CardEdit;
