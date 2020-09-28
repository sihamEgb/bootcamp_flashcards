import React from 'react';
import Form from './Form';


class History extends React.Component {
	

	
	render(){
		return (
			<Form
			question=""
			answer=""
			category=""
			callback={this.props.addCard}
			></Form>
		);
	}
}

export default History;
