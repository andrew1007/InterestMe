import React, {Component} from 'react'
import { connect } from 'react-redux'
import PinBody from './pin_body'
import PinHeader from './pin_header/pin_header'
import PinImage from './pin_image'

class PinPresentational extends Component {

  render() {
    return (
      <div className='pin-container'>
        <PinHeader {...this.props}/>
        <PinImage imageUrl={this.props.image_url}/>
        <PinBody {...this.props}/>
      </div>
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
