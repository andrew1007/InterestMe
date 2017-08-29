import React from 'react';
import Modal from 'react-modal';


export default class Signup extends React.Component {
  render(){
    return(
      <div className="splash-container">
        <img className="splashscreen"/>
        <div className="splashtext-container">
            <div className="splashtext-catchphrase-container">
              <img src="https://res.cloudinary.com/andoo/image/upload/v1487183912/Logomakr_7pMPpx_bxusuq.png"/>
              <div className="splashtext-catchphrase-subtext-container">
                <div className="splashscreen-main-catchphrase">
                  Everything you're looking for, in one place
                </div>
                <div className="splashscreen-sub-catchphrase">
                  Share and find what you love
                </div>
              </div>
            </div>
      </div>
    </div>
    )
  }
}
