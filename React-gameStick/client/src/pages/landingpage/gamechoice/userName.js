import React, { Component } from 'react';

class UserName extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
        <div className="text-center">
          <h6>Enter Username : <input className='landing-page-input'  id='userNameInput' placeholder="Enter Username" ></input></h6>
        </div>
    );
  }
}

export default UserName;
