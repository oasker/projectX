import React, { Component } from 'react';

class Button extends Component {
  render() {
    return (
      <button className="btn" onClick()={ this.props.fn } >{ this.props.label }</button>
    );
  }
}

class Input extends Component {
  render() {
    return (
      <input id = { this.props.id }/>
    );
  }

}

export default Button;
export default Input;
