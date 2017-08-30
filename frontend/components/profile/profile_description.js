import React, { Component } from 'react'

export default class ProfileDescription extends Component {
  render() {
    return(
      <div>
        {this.props.description}
      </div>
    )
  }
}
