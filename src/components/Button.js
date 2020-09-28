import React from 'react';
import '../css/button.css';



class Button extends React.Component{

	onButtonClick = (e)=>{
		console.log("button clicked");
		this.props.callback();
	}
	render(){
		return (
			<button
			onClick = {this.onButtonClick}
			>
				{this.props.text}
			</button>
		);
	}
}

export default Button;
