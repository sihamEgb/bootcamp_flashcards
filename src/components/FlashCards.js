import React from "react";
import Button from './Button';

class FlashCards extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = { cards: this.props.location.state.cards , currentCard:[], isAnswerRevealed:false, completed:0};
    this.flashCardsNumber = this.props.location.state.cards.length;
  }
  componentDidMount(){
    this.getRandomCard();
  }
 

  getRandomCard(){
    const randomIndex =  Math.floor(Math.random() * Math.floor(this.state.cards.length));
    this.setState({currentCard:this.state.cards[randomIndex]})
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
        this.setState({cards: temp,completed:this.state.completed+1});
      }
    }
    this.setState({isAnswerRevealed:false});
    this.getRandomCard();

  }
  renderQuestion(){
    return (
      <div>
        <div>
          {this.state.currentCard.question}
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
        Completed {this.state.completed}/{this.flashCardsNumber}
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


  // <Link to={{pathname:"/Topics/", customObject: cu22222stomValue}}>

  render() {
    return (
    <div>
      {this.state.isAnswerRevealed ? this.renderAnswer()  : this.renderQuestion()} 
      {this.renderProgressBar()}
    </div>
    );
  }
}

export default FlashCards;
