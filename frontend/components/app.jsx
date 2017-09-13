import React from 'react';
import NavBar from './nav_bar';
import Navigation from './navigation/navigation'
import {hashHistory} from 'react-router'
import Modal from 'react-modal';

export default class App extends React.Component {
  constructor(props){
    super(props)
  }

  componentWillMount() {
    Modal.setAppElement('body');
  }

  render() {
    // <NavBar/>
    return(
      <div>
        <Navigation/>
        {this.props.children}
      </div>
    )
  }
}
