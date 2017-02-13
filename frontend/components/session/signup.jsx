import React from 'react';
import Modal from 'react-modal';


export default class Signup extends React.Component {
  constructor(){
    super();
    document.body.style.overflow = "hidden";
  }

  render(){
    return(
      <div className="splash-container">
        <img className="splashscreen"/>
        <div className="splashtext">
          Everything you're looking for in one place
        </div>
      </div>
    )
  }
}
