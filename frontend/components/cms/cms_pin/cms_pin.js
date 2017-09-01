import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'

class PinCMSPresentational extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        stuff
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  state
})

const mapDispatchToProps = dispatch => ({

})

const CMSPin = connect(
  mapStateToProps,
  mapDispatchToProps
)(CMSPinPresentational)

export default CMSPin
