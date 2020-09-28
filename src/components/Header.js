import React from "react";
import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <div className='ui secondary pointing menu'>
			<Link to='/' className='item'>Homepage</Link>
      <Link    
      to={{
        pathname:'/flashcards' ,
        className:'item',
        state: {cards: props.cards}
      }}
      >Flash Cards</Link>
      <Link 
      to={{ 
        pathname: '/cardsmanager', 
        state: { cards: props.cards } 
      }}
      className='item'
      >Cards Manager</Link>

    </div>
  );
};

export default Header;
