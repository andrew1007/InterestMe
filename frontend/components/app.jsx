import React from 'react';
import NavBar from './nav_bar';
import {hashHistory} from 'react-router'

export default class App extends React.Component {
  constructor(props){
    super(props)
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
