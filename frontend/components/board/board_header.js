import React, { Component } from 'react'

export default class BoardHeader extends Component {
  render() {
    return(
      <div>
        <div>
          <div>
            {this.props.name}
          </div>
          <div>
            A board by {this.props.username}
          </div>
        </div>
      </div>
    )
  }
}
