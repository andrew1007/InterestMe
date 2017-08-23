import React, {Component} from 'react'
export default class PinImage extends Component {
  render() {
    return (
      <div>
        <img
          src={this.props.imageUrl}
        />
      </div>
    )
  }
}
