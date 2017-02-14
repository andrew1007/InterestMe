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
        <div className="splashtext-container">
            <img className="logo-text" src="https://res.cloudinary.com/andoo/image/upload/v1487087485/Logomakr_1ffThT_guaa9u.png"/>
        </div>
      </div>
    )
  }
}
