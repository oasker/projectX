import React, {Component} from 'react';
import {render} from 'react-dom';
import Swipe from 'react-swipe-component';

class SwipeClass extends Component{
    constructor(){
        super();
        this.vars = ["props.dom"];
        this.onSwipeLeftListener = this._onSwipeLeftListener.bind(this);
        this.onSwipeRightListener = this._onSwipeRightListener.bind(this);
        this.onSwipeDownListener = this._onSwipeUpListener.bind(this);
        this.onSwipeUpListener = this._onSwipeDownListener.bind(this);
        this.onSwipeListener = this._onSwipeListener.bind(this);
        this.event = [];
        console.log(this.props)
    }
    render() {
        return (<Swipe
                nodeName="div"
                className="test"
                mouseSwipe={false}
                onSwipedLeft={this.onSwipeLeftListener}
                onSwipedRight={this.onSwipeRightListener}
                onSwipedDown={this.onSwipeDownListener}
                onSwipedUp={this.onSwipeUpListener}
                onSwipe={this.onSwipeListener}>
                { this.props.dom }
        </Swipe>);
    }
    _onSwipeLeftListener(){
      console.log("poop")
    }
    _onSwipeRightListener(){
      console.log("right")
    }
    _onSwipeUpListener(){
      console.log("up")
    }
    _onSwipeDownListener() {
      console.log("down")
    }
    _onSwipeListener(e){
    }
}

export default SwipeClass;
