import React, {Component} from 'react'
import { connect } from 'react-redux'
import PinBody from './pin_body'
import PinHeader from './pin_header/pin_header'
import PinImage from './pin_image'
import Modal from 'react-modal';

class PinPresentational extends Component {
  render() {
    console.log(this.props);
    const { board_id, id, title, body, profile_picture } = this.props
    const { username, owner, togglePinShow, user_id, board_name } = this.props
    const pinHeaderProps = { board_id, id, title, body, owner, board_name,
      togglePinShow: this.props.togglePinShow.bind(this)
    }
    const pinBodyProps = { title, user_id, body, username, profile_picture }
    return (
      <Modal
        isOpen={true}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={() => this.props.togglePinShow()}
        contentLabel="Modal"
        className="ReactModal__Content"
      >
        <div className='pin-container'>
          <div>
            <PinHeader {...pinHeaderProps}/>
          </div>
          <div>
            <PinImage imageUrl={this.props.image_url}/>
          </div>
          <div>
            <PinBody {...pinBodyProps}/>
          </div>
        </div>
      </Modal>
    )
  }
}


// const mapStateToProps = ({boards, session, pins}, ownProps) => ({
// });
//
// const mapDispatchToProps = (dispatch) => ({
// });


const Pin = connect(
  null,
  null
)(PinPresentational)

export default Pin
