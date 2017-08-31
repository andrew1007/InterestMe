import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'

class PinUploadPresentational extends Component {
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

const PinUpload = connect(
  mapStateToProps,
  mapDispatchToProps
)(PinUploadPresentational)

export default PinUpload
