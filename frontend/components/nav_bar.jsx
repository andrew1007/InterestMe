import React from 'react';
import SessionContainer from './session/session_container'
import {hashHistory} from 'react-router';
import PinNewFormContainer from './pins/pin_new_container'
export default class NavBar extends React.Component {
  constructor(){
    super()
    this.handleLogoImageClick = this.handleLogoImageClick.bind(this);
  }

  handleLogoImageClick(e){
    e.preventDefault();
    hashHistory.push(`/home`)
  }

  render() {
    return(
      <div>
        <div className="navigation-bar">
          <div className="flex-searchbar">
          </div>
          <div className="session-button-container">
            <SessionContainer/>
          </div>
        </div>
      </div>
    )
  }
}
