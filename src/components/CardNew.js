import React from 'react';
import Form from './Form';


class CardNew extends React.Component {
	
	handleChange(event) {
		const value = event.target.value;
    const name = event.target.name;
    this.setState((prevState) => ({
      ...prevState,
      [name]: value,
		}));		
  }

	render(){
		return (
			<Form
			question=""
			answer=""
			callback={this.props.addCard}
			></Form>
		);
	}
}

export default CardNew;
