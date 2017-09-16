import React, {Component} from 'react'
import { connect } from 'react-redux'
import PinBody from './pin_body'
import PinHeader from './pin_header/pin_header'
import PinImage from './pin_image'
import Modal from 'react-modal';
import {editPin, deletePin} from '../../actions/pin_actions'

class PinPresentational extends Component {
  render() {
    const { board_id, id, title, body, profile_picture, image_url } = this.props.boardTile
    const { username, owner, togglePinShow, user_id, board_name } = this.props.boardTile
    const pinHeaderProps = { board_id, id, title, body, owner, board_name,
      togglePinShow: this.props.boardTile.togglePinShow.bind(this)
    }
    const pinBodyProps = { title, user_id, body, username, profile_picture }

    return (
      <Modal
        isOpen={true}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={() => this.props.boardTile.togglePinShow()}
        contentLabel="Modal"
        className="ReactModal__Content"
      >
        <div className='pin-container'>
          <div>
            <PinHeader {...pinHeaderProps}/>
          </div>
          <div>
            <PinImage imageUrl={image_url}/>
          </div>
          <div>
            <PinBody {...pinBodyProps}/>
          </div>
        </div>
      </Modal>
    )
  }
}


const mapDispatchToProps = (dispatch) => ({
  editPin: (pin) => dispatch(editPin(pin)),
  deletePin: (id) => dispatch(deletePin(id))
});


const Pin = connect(
  null,
  mapDispatchToProps
)(PinPresentational)

export default Pin
