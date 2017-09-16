import React, { Component } from 'react'
import SessionSignupForm from './session_signup_form'
import Modal from 'react-modal'
import { login } from '../../../actions/session_actions'
import { connect } from 'react-redux'

class SessionSignupPresentational extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: ""
    }
  }

  update(content, text) {
    const newText = typeof content === 'string' ? content : content.currentTarget.value
    this.setState({[text]: newText})
  }

  handleSubmit(e) {
    e.preventDefault()
    const {username, password} = this.state
    const submitProps = {username, password}
    this.props.signup(submitProps)
  }

  render() {
    const sessionSignupFormProps = {
      update: (content, text) => this.update(content, text),
      handleSubmit: (e) => this.handleSubmit(e),
      toggleSignupModal: () => this.props.toggleSignupModal()
    }
    return (
      <Modal
        isOpen={true}
        onRequestClose={() => this.props.toggleSignupModal()}
        contentLabel='modal'
        className='cms-pin-modal'
        >
        <SessionSignupForm {...sessionSignupFormProps}/>
      </Modal>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  signup: (user) => dispatch(signup(user))
})

const SessionSignup = connect(
  null, mapDispatchToProps
)(SessionSignupPresentational)

export default SessionSignup
