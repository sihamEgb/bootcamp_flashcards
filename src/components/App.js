import React from "react";
// import mockapi from "../api/mockapi";

import { BrowserRouter, Route } from "react-router-dom";

import Homepage from "./Homepage";
import Header from "./Header";
import FlashCards from "./FlashCards";
import CardsManager from "./CardsManager";

class App extends React.Component{
  
  constructor(props){
    super(props);
    // this.state = {cards:[],categories:[]};
    // this.getCards();
  }

  // async getCards() {
  //   const response = await mockapi.get("flashcards");
  //   this.setState({ cards: response.data });
  //   // this.setState({isLoading:false});
  //   console.log("all cards",response);
  // }

  // categories
  /**
    
  Javascript Html CSS React JSON Nodejs
   **/
  render(){
      return (
        <div>
          <BrowserRouter>
            <div>
              {/* <Header cards={this.state.cards} categories={this.state.categories} /> */}
              <Header/>
              <Route exact path='/' component={Homepage} />
              <Route exact path='/flashcards' component={FlashCards} />
              <Route exact path='/cardsmanager' component={CardsManager} />
              <Route exact path='/history' component={History} />
              {/* <Route exact path='/products/:id' component={ProductDetail} /> */}
            </div>
          </BrowserRouter>
        </div>
      );
  }

}

export default App;
