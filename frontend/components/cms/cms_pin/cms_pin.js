import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import CMSPinForm from './cms_pin_form'
import { getProfilePage } from '../../../actions/user_actions'
import {createPin, getPins} from '../../../actions/pin_actions';

class CMSPinPresentational extends Component {
  constructor(props) {
    super(props)
  }

  async componentWillMount() {
    await this.props.getProfilePage(this.props.session.id)
  }

  render() {
    const {boards, id} = this.props.user
    const {createPin} = this.props
    const cmsPinFormProps = {boards, id,
      createPin: (pin) => this.props.createPin(pin),
      toggleCMSPin: () => this.props.toggleCMSPin(),
      getPins: (boardId) => this.props.getPins(boardId)
    }
    return (
      <Modal
        isOpen={true}
        onRequestClose={() => this.props.toggleCMSPin()}
        contentLabel='modal'
        className='cms-pin-modal'
        >
        <CMSPinForm {...cmsPinFormProps}/>
      </Modal>
    )
  }
}

const mapStateToProps = ({user, session}) => ({
  user: user.user,
  session: session.currentUser
})

const mapDispatchToProps = dispatch => ({
  getProfilePage: (id) => dispatch(getProfilePage(id)),
  createPin: (pin) => dispatch(createPin(pin)),
  getPins: (boardId) => dispatch(getPins(boardId))
})

const CMSPin = connect(
  mapStateToProps,
  mapDispatchToProps
)(CMSPinPresentational)

export default CMSPin
