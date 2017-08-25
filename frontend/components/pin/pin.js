import React, {Component} from 'react'
import { connect } from 'react-redux'
import PinBody from './pin_body'
import PinHeader from './pin_header/pin_header'
import PinImage from './pin_image'
import Modal from 'react-modal';

class PinPresentational extends Component {
  render() {
    console.log(this.props);
    let pinHeaderProps = {
      board_id: this.props.board_id,
      id: this.props.id,
      title: this.props.title,
      body: this.props.body,
      togglePinShow: this.props.togglePinShow,
      owner: this.props.owner
    }
    let pinBodyProps = {
      title: this.props.title,
      user_id: this.props.user_id,
      body: this.props.body,
      username: this.props.username,
      profile_picture: this.props.profile_picture
    }
    console.log(this.props);
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
