import React, { Component } from 'react'

export default class ProfileBoardTabIcon extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      loadedCounter: 0
    }
  }

  updateCounter() {
    this.setState({loadedCounter: this.state.loadedCounter + 1},
      () => {
        if (this.state.loadedCounter > 2) {
          this.setState({loaded: true})
        }
      }
    )
  }

  images() {
    debugger
    return this.props.board.sample_images.map((url, idx) => {
      return (
        <div>
          <img
            src={url}
            onLoad={updateCounter.bind(this)}
          />
        </div>
      )
    })
  }

  render() {
    console.log(this.props);
    return (
      <div className='visible'>
        {this.props.name}
        {this.images()}
      </div>
    )
  }
}
