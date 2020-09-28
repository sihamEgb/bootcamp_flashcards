import React from "react";
import Button from './Button';
import '../css/flashcards.css'
import mockapi from "../api/mockapi";

class FlashCards extends React.Component {
  constructor(props) {
    super(props);
    // this.state = { cards: this.props.location.state.cards , currentCard:[], isAnswerRevealed:false, completed:0};
    // this.flashCardsNumber = this.props.location.state.cards.length;
    this.state = {cards:[],currentCard:[], isAnswerRevealed:false, completed:0,flashCardsNumber:0,onFinished:false};
    this.originalCards = [];
    this.getCards();
  }
  componentDidMount(){
    // this.getRandomCard();
  }
  restartGame = () => {
    console.log("restart game");
    console.log(this.originalCards);
    
    this.setState({cards:this.originalCards,currentCard:[], isAnswerRevealed:false, completed:0,onFinished:false},()=>{
      console.log(this.state);
      this.getRandomCard();
    });
  }
 

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
      <div>
        <div>
          {this.state.currentCard ? this.state.currentCard.question : null}
        </div>
        <Button
          text = 'New Card'
          callback = {this.onNewCard}
        ></Button>
        <Button
          text = 'Reveal Answer'
          callback = {this.onRevealAnswer}
        ></Button>
      </div>
    );
  }
  renderProgressBar(){
    return (
      <div>
        Completed {this.state.completed}/{this.state.flashCardsNumber}
      </div>
    );
  }
  renderAnswer(){
    return (
      <div>
        <div>
          {this.state.currentCard.answer}
        </div>
        Did you get it right?
        <Button
          text = 'Yes'
          callback = {this.onAnswerRight}
        ></Button>
        <Button
          text = 'No'
          callback = {this.onAnswerWrong}
        ></Button>
      </div>
    );
  }

  renderFinish(){
    const date = new Date();
    let times = JSON.parse(localStorage.getItem(date.toDateString()));
    times = times ? times+1 : 1;
    localStorage.setItem(`${date.toDateString()}`, times);

    return (<div>
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
      return this.renderFinish();
    }
    return (
    <div>
        {this.state.isAnswerRevealed ? this.renderAnswer()  : this.renderQuestion()} 
        {this.renderProgressBar()} 
    </div>
    );
  }
}

export default FlashCards;
