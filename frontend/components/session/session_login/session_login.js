import React, { Component } from 'react'
import SessionLoginForm from './session_login_form'
import Modal from 'react-modal'
import { login } from '../../../actions/session_actions'
import { connect } from 'react-redux'

class SessionLoginPresentational extends Component {
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
    console.log(this.state);
  }

  handleSubmit(e) {
    e.preventDefault()
    const {username, password} = this.state
    const submitProps = {username, password}
    this.props.login(submitProps)
  }

  render() {
    const sessionLoginFormProps = {
      update: (content, text) => this.update(content, text),
      handleSubmit: (e) => this.handleSubmit(e),
      toggleLoginModal: () => this.props.toggleLoginModal()
    }
    return (
      <Modal
        isOpen={true}
        onRequestClose={() => this.props.toggleLoginModal()}
        contentLabel='modal'
        className='cms-pin-modal'
        >
        <SessionLoginForm {...sessionLoginFormProps}/>
      </Modal>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  login: (user) => dispatch(login(user))
})

const SessionLogin = connect(
  null, mapDispatchToProps
)(SessionLoginPresentational)

export default SessionLogin
