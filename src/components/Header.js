import React from "react";
import { Link } from "react-router-dom";
import '../css/homepage.css'

const Header = (props) => {
  return (
    <div className='header'>
			<Link to='/' className='item'>Homepage</Link>
      <Link className='item'
      to={{
        pathname:'/history' ,
        // state: {cards: props.cards}
      }}
      >History</Link>
      <Link className='item'
      to={{ 
        pathname: '/cardsmanager', 
        // state: { cards: props.cards , categories: props.categories} 
      }}
      >Cards Manager</Link>

    </div>
  );
};

export default Header;
