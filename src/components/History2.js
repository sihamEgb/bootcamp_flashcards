import React from 'react';
// import Form from './Form';


class History2 extends React.Component {
	constructor(props){
		super(props);
		this.state =  {stats:""};
	}

	getStats(){
	// 	// const date = new Date();
    const res = JSON.parse(localStorage.getItem('stats'));
		this.setState({stats:res});
	// 	// const newDate = date.toDateString();
  //   // if(stats === null){
  //   //   stats = [];
  //   //   stats.push(newDate);
  //   // }
  //   // //`${date.toDateString()}`
  //   // else if(stats[stats.length-1] === newDate){

  //   // }
	}
	render(){
		return (
			<div>

				{this.state.stats}
			</div>
		);
	}
}

export default History2;
