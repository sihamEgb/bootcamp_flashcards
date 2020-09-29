import React from "react";
import Button from './Button';
import '../css/flashcards.css'
import mockapi from "../api/mockapi";

class FlashCards extends React.Component {
  constructor(props) {
    super(props);
    // this.state = { cards: this.props.location.state.cards , currentCard:[], isAnswerRevealed:false, completed:0};
    // this.flashCardsNumber = this.props.location.state.cards.length;
    this.state = {
      cards:this.props.location.state.cards,
      currentCard:[], 
      isAnswerRevealed:false, 
      completed:0,
      flashCardsNumber:this.props.location.state.cards.length,
      onFinished:false};
    this.originalCards = this.props.location.state.cards;
    // this.getCards();

    // this.setState({ cards: response.data , flashCardsNumber:response.data.length});
    // this.setState({isLoading:false});
    // this.originalCards = response.data;
    // console.log("all cards",response);
    // this.getRandomCard();
  }
  componentDidMount(){
    this.getRandomCard();
  }
  restartGame = () => {
    console.log("restart game");
    console.log(this.originalCards);
    
    this.setState({cards:this.originalCards,currentCard:[], isAnswerRevealed:false, completed:0,onFinished:false},()=>{
      console.log(this.state);
      this.getRandomCard();
    });
  }
 
  // TODO remove this
  async getCards() {
    const response = await mockapi.get("flashcards");
    this.setState({ cards: response.data , flashCardsNumber:response.data.length});
    // this.setState({isLoading:false});
    this.originalCards = response.data;
    console.log("all cards",response);
    this.getRandomCard();

  }

  getRandomCard(){
    
    const randomIndex =  Math.floor(Math.random() * Math.floor(this.state.cards.length));
    this.setState({currentCard:this.state.cards[randomIndex]})
    console.log("choosing random card",this.state);
  }

  // callbacks
   onNewCard = () => {
    this.getRandomCard();
    console.log("on new card");

  }
  onRevealAnswer = () => {
    console.log("on reveal answer");
    this.setState({isAnswerRevealed:true});

  }
  onAnswerWrong = () => {
    console.log("on wrong answer");
    // do nothing
    this.setState({isAnswerRevealed:false});
    this.getRandomCard();
  }
  onAnswerRight = () => {
    // remove card
    for(let i=0;i<this.state.cards.length;i++)
    {
      if(this.state.cards[i].id === this.state.currentCard.id)
      {
        const temp = [...this.state.cards];
        temp.splice(i, 1);
        this.setState({cards: temp,completed:this.state.completed+1},
          () => {
            if(this.state.completed === this.state.flashCardsNumber)
            {
              // game finished
              this.setState({onFinished:true});
            }
            else
            {
              this.getRandomCard();
            }
          }
          );
      }
    }
    this.setState({isAnswerRevealed:false});
  }
  renderQuestion(){
    return (
      <div className="cardContainer">
        <div className="data">
          {this.state.currentCard ? this.state.currentCard.question : null}
        </div>
        <div className="actionContainer">
        <Button
          text = 'New Card'
          callback = {this.onNewCard}
        ></Button>
        <Button
          text = 'Reveal Answer'
          callback = {this.onRevealAnswer}
        ></Button>

        </div>
      </div>
    );
  }
  renderProgressBar(){
    return (
      <div className="progressBar">
        Completed {this.state.completed}/{this.state.flashCardsNumber}
      </div>
    );
  }
  renderAnswer(){
    return (
      <div className="cardContainer">
        <div className="data">
          {this.state.currentCard.answer}
        </div>
        <h3>
        Did you get it right?
        </h3>
        <div className="actionContainer">
        <Button
          text = 'Yes'
          callback = {this.onAnswerRight}
        ></Button>
        <Button
          text = 'No'
          callback = {this.onAnswerWrong}
        ></Button>
        </div>
      </div>
    );
  }

  renderFinish(){
    const date = new Date();
    let stats = JSON.parse(localStorage.getItem('stats'));
    const newDate = date.toDateString();
    if(stats === null){
      stats = [];
      stats.push(newDate);
    }
    //`${date.toDateString()}`
    else if(stats[stats.length-1] === newDate){

    }
    else{
      stats.push(newDate);
    }
    //date.toDateString()
    localStorage.setItem('stats',JSON.stringify(stats));

    return (<div className="cardContainer">
      <h1>Done!</h1>
      {this.renderProgressBar()} 
      <Button
      text = "shuffle"
      callback = {this.restartGame}
      ></Button>
    </div>);

  }
  // <Link to={{pathname:"/Topics/", customObject: cu22222stomValue}}>

  render() {
    if(this.state.onFinished){
      return (
        <div className="bodyContainer">
          {this.renderFinish()}
        </div>
      );
    }
    return (
    <div className="bodyContainer">
      <div className="actionContainer">
        {this.state.isAnswerRevealed ? this.renderAnswer()  : this.renderQuestion()} 
      </div>
        {this.renderProgressBar()} 
    </div>
    );
  }
}

export default FlashCards;
