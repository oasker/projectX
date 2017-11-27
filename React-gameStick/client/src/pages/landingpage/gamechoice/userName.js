import React, { Component } from 'react';

class UserName extends Component {
  constructor(props){
    super(props);
  }

  checkUserName(){
    var userName = document.getElementById('userName');
    if(userName.value !== ""){
      return true;
    } else {
      userName.style.border = "2px solid red";
      return false;
    }
  }

  render() {
    return (
        <div className="text-center">
          <h3>Enter Username</h3>
          <br/>
          <input className='landing-page-input' id='userName' placeholder="Enter Username" ></input>
          <br/>
          <button className='btn'>Enter</button>
        </div>
    );
  }
}

export default UserName;
