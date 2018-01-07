// src/components/App/index.js
import React, { Component } from 'react';

export default class Button extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <button className="btn" onClick = ()=>{ this.props.func }>
      </button>
    );
  }
}
