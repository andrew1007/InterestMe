import React from 'react';
import NavBar from './nav_bar';
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
    return(
      <div>
        <NavBar/>
        {this.props.children}
      </div>
    )
  }
}
