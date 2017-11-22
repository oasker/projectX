import React, { Component } from 'react';

class UserSubmittedCard extends Component {

  constructor(props){
    super();
    this.state = props;
    this.props = props;
  }

  componentDidMount(){
    console.log("this worked ")
  }

  render() {
    return (
      <div className="user-submited-card-container" >
      </div>
    );
  }
}

export default UserSubmittedCard;
