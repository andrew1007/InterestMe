import React, { Component } from 'react'
import CMSPin from '../cms/cms_pin/cms_pin'

export default class NavigationNewPin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false
    }
  }

  toggleCMSPin() {
    this.setState({show: this.state.show ? false : true}, () => {
      document.body.style.overflow = this.state.show ? 'hidden' : 'auto'
    })
  }

  render() {
    const CMSPinProps = {toggleCMSPin: () => this.toggleCMSPin()}
    return (
      <div>
        <button onClick={() => this.toggleCMSPin()}>
          new Pin
        </button>
        {this.state.show ? <CMSPin {...CMSPinProps}/> : null}
      </div>
    )
  }
}
