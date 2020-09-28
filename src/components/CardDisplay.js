import React from 'react';
import { Link } from 'react-router-dom';


const CardDisplay = (props) => {
	
	// solution A
	// const {id}  = useParams();
	// const id = props.match.params.id;
	// const product = getProduct(id)[0];

	// solution B
	const card = props.location.card || [];
	
			
	return (
		<div>
		<div className="ui card">
			<div>{card.question}</div>
			<div>{card.answer}</div>
		</div>
		<Link to="/products">New</Link>
		<Link to="/products">Reveal Answer</Link>
		<Link to="/products">Back</Link>
		</div>
	);
}
// const mapStateToProps = (state , ownProps) => {
// 	return {product: null};
// };

export default CardDisplay;
