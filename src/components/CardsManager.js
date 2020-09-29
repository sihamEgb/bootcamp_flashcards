import React from "react";
import mockapi from "../api/mockapi";
import Form from './Form';
import CardNew from "./CardNew";
import CardEdit from "./CardEdit";


import '../css/card-manager.css'

class CardsManager extends React.Component {
  constructor(props) {
		super(props);
		this.state = {cards:[] ,	clickedCard:null , newCardSubmitted:false};
		this.getCards();
		
		// console.log("props",this.props.location.state.cards);
		//.location.cards
		// this.state = { cards: this.props.location.state.cards ,
		// 							 categories: this.props.location.state.categories , 
		// 								clickedCard:null , 
		// 								newCardSubmitted:false};
  	}

		async getCards() {
			const response = await mockapi.get("flashcards");
			this.setState({ cards: response.data });
			// this.setState({isLoading:false});
			console.log("all cards",response);
		}
	// callback functions
	// no callback to app... just change in api 
	// and app will fetch from api most updated state
	deleteCard = async (deletedCard)=> {
		console.log("cards manager delete",deletedCard);
		//this.setState({isLoading:true});
    await mockapi.delete(`flashcards/${deletedCard.id}`);
		const filteredCards = this.state.cards.filter(
      (card) => card.id !== deletedCard.id
    );
    this.setState({ cards: filteredCards , isEditCard:false });
		//this.setState({isLoading:false});
		
	}
	addCard = async (card) => {
		console.log("cards manager add",card);
			//this.setState({isLoading:true});
			const response = await mockapi.post("flashcards", card);
			//TODO add card
			this.setState({ cards: [...this.state.cards, response.data],newCardSubmitted:true});
			// this.setState({isLoading:false});
	}

	 editCardState (editedCard) {
		
		const filteredCardsList = this.state.cards.map(
			(card) => {
				if(editedCard.id === card.id){
					return editedCard;
				}
				return card;
			}
			);
		this.setState({ cards: filteredCardsList });


	}
	onEditClick = (card) =>
	{
		console.log(card);
		this.setState({isEditCard:true, clickedCard:card});
	}
	editCard = async (card) => {
		console.log("cards manager edit",card);
			//this.setState({isLoading:true});
			await mockapi.put(`flashcards/${card.id}`, card);
			//TODO delete card
			this.setState({isEditCard:false});
			this.editCardState(card);
			//this.setState({isLoading:false});
	}
	// // callbacks for categories
	// onEditCategory = async (category) => {

	// }
	// // deleting a category will delete all flashcards in this category
	// onDeleteCategory = async (category) => {

	// }
	// onAddCategory = async (category) => {
		
	// }
	// renderCategories(){
	// 	const categoriesComp = this.state.categories.map(
	// 		cat => {
	// 			return <div
	// 							className="category"
	// 							key={cat.id}
	// 							// editCategory={this.onEditCategory}
	// 							// deleteCategory={this.onDeleteCategory}
	// 							>
	// 								{cat.category}
	// 							</div>
	// 		}
	// 	);
	// 	return categoriesComp;
	// }
	renderAllCards(){
		const cardsComp = this.state.cards.map(
			card => {
				return <CardEdit
								key={card.id}
								card={card}
								editCard={this.onEditClick}
								deleteCard={this.deleteCard}
								></CardEdit>
			}
		);
		return cardsComp;
	}
	renderEdit(){
		if(this.state.isEditCard)
		{
			console.log("inside render edit",this.state.clickedCard);
			return (
				<div className="editCardContainer">
					<h2 className="title">Edit Card</h2>
					<Form
					question={this.state.clickedCard.question}
					answer={this.state.clickedCard.answer}
					category = {this.state.clickedCard.category}
					id={this.state.clickedCard.id}
					callback={this.editCard}
					></Form>
				</div>
			);
		}				

	}
  render() {
		
    return (	
					<div className="container">
						{/* {this.renderCategories()} */}
						<div className="cardsContainer">
						{this.renderAllCards()}
						</div>
						{this.renderEdit()}	
						<div className="newCardContainer">
							<h2 className="title">Add more cards</h2>
						<CardNew
							addCard={this.addCard}
						></CardNew>
						</div>
					</div>);
  }
}

export default CardsManager;
