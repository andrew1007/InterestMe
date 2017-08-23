import React, {Component} from 'react'
import { connect } from 'react-redux'
import PinBody from './pin_body'
import PinHeader from './pin_header/pin_header'
import PinImage from './pin_image'
import Modal from 'react-modal';

class PinPresentational extends Component {

  render() {
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
          <PinHeader {...this.props}/>
          <PinImage imageUrl={this.props.image_url}/>
          <PinBody {...this.props}/>
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
