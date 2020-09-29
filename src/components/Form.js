import React from 'react';
import '../css/form.css'


class Form extends React.Component {
	
	constructor(props){
		super(props);
		this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			question: this.props.question, 
			answer:this.props.answer,
			category:this.props.category,
			id:this.props.id};
	}
	
	handleChange(event) {
		const value = event.target.value;
    const name = event.target.name;
    this.setState((prevState) => ({
      ...prevState,
      [name]: value,
		}));		
  }
	handleSubmit = (e) => {
		e.preventDefault();
		const newCard = {};
		if(this.props.id){
			newCard.id = this.props.id;
		}
		newCard.answer =  this.state.answer;
		newCard.question = this.state.question;
		newCard.category = this.state.category;
		
		console.log("in handleSubmit",newCard);
		this.props.callback(newCard);
		// this.props.addCard(newCard);
	}	
	render(){
		return (
			<form onSubmit={this.handleSubmit}>
			<label>
				Question:
			<input type="text" name="question" 
			value={this.state.question}
			onChange={this.handleChange}
			/>
			</label>
			<label>
				Answer:
			<input type="text" name="answer" 
				value={this.state.answer}
				onChange={this.handleChange}
			/>
			</label>
			<label>
				Category:
				<input type="text" name="category" 
				value={this.state.category}
				onChange={this.handleChange}
			/>
			</label>
			<div className="buttonContainer">
			<input className="button" type="submit" value="Submit" />
			</div>
		</form>
		);
	}
}

export default Form;


