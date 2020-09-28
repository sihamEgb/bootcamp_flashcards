import React from 'react';
import '../css/form.css'


class Form extends React.Component {
	
	constructor(props){
		super(props);
		this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {question: this.props.question, answer:this.props.answer,id:this.props.id};
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
			</label>
			<input type="submit" value="Submit" />
		</form>
		);
	}
}

export default Form;


