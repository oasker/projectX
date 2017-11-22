import React, { Component } from 'react';

class StatusBar extends Component {

  constructor(props){
    super();
    this.user = props.user;
  }

  componentDidMount(){
  }

  render() {
    return (
        <ul className="status-bar">
          <li className="sb-list">User : { this.user.userName }</li>
          <li className="sb-list">Cards Won : { this.user.whiteCards }</li>
          <li className="sb-list">{ this.user.turn } turn</li>
          <li className="sb-list">{ this.user.userName }</li>
        </ul>
    );
  }
}

export default StatusBar;
