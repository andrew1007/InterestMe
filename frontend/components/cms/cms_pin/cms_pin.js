import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import CMSPinImage from './cms_pin_image'
import CMSPinForm from './cms_pin_form'
import { getProfilePage } from '../../../actions/user_actions'
import {createPin} from '../../../actions/pin_actions';

class CMSPinPresentational extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.getProfilePage(this.props.session.id)
    console.log(this.props);
  }

  render() {
    // <Modal
    //   onRequestClose={() => this.props.closeButton('newPinModal')}
    //   >
    //   stuff
    // </Modal>
    console.log(this.props);
    const {boards, id} = this.props.user
    const {createPin} = this.props
    const cmsPinFormProps = {boards, id, createPin}
    // <CMSPinImage/>
    return (
      <div>
        <CMSPinForm {...cmsPinFormProps}/>
      </div>
    )
  }
}

const mapStateToProps = ({user, session}) => ({
  user: user.user,
  session: session.currentUser
})

const mapDispatchToProps = dispatch => ({
  getProfilePage: (id) => dispatch(getProfilePage(id)),
  createPin: (pin) => dispatch(createPin(pin))
})

const CMSPin = connect(
  mapStateToProps,
  mapDispatchToProps
)(CMSPinPresentational)

export default CMSPin
