import React from "react";
import Button from './Button';
import { Link } from "react-router-dom";
import mockapi from "../api/mockapi";
import '../css/homepage.css'

class Homepage extends React.Component{
  // render categories

  constructor(props){
    super(props);
    this.state = {categories:[],selected:[]};
    this.getCategories();
  }

  getCategories = async () => {
    console.log("11111");
    const response = await mockapi.get("categories");
    console.log("2222");

    console.log("all categories",response);
    this.setState({ categories: response.data});
    // this.setState({isLoading:false});
    console.log("3333");

  }
  clickCategory = (e) => {

    console.log(e.target.innerHTML);
    const arr = [];
    if(this.state.selected.length === 0)
    {
      console.log("11111111");
      arr.push(e.target.innerHTML);
      this.setState({selected:arr});
      console.log("2222222");
      
      return;
    }
    const index = this.state.selected.findIndex(e.target.category);
     if( index !== -1)
        {
          const temp = [...this.state.selected];
          temp.splice(index, 1);
          this.setState({selected: temp});
        }
        else
        {
          this.setState({selected:[...this.state.selected].push(e.target.category)});
        }
  }
  
  renderCategories = () => {
    // return this.state.categories.findIndex(category);
    console.log("in render categorues",this.state);
    return this.state.categories.map(
      category => {
        console.log("category",category);
        let selected = "selected";
        if((this.state.selected.length > 0) && (this.state.selected.findIndex(category) === -1))
        {
          // console.log("gse");
        }
        else
        {
          selected = "";
        }
        return (
          <div 
          className={`category ${selected}`}
          key = {category.id}
          id = {category.id}
          category = {category.category}
          onClick = {this.clickCategory}
          >
            {category.category}
          </div>
        );
      }
    );
  }

  onStartGame = () => {
    console.log("game starting"); 
  }
  render(){
    console.log("homepage props",this.props);
    return (
          <div>
            <h1>Welcome to Flash Cards</h1>
            <h3>Web development Edition</h3>
            <div className="playArea">
              <div>Choose Categories</div>
              {/* {this.renderCategories()} */}
            </div>
            

            <Link
              to={{
                pathname:'/flashcards' ,
                state: {cards: this.props.cards}
              }}
              >Start Training</Link>

            {/* <Button
            text = "Start Training"
            callback = {this.onStartGame}
            ></Button> */}
            </div>
          );
  }
}

export default Homepage;
