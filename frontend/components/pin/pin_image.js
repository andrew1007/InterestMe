import React, {Component} from 'react'
export default class PinImage extends Component {
  render() {
    return (
      <div className='pin-image-container'>
        <img
          className='pin-image-image'
          src={this.props.imageUrl}
        />
      </div>
    )
  }
}
