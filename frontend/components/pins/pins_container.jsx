import { connect } from 'react-redux';
import { getPin } from '../../actions/pin_actions';
import Pin from './pin';

const mapStateToProps = (state, ownProps) => {
  return {pin: state}
};

const mapDispatchToProps = (dispatch) => ({
  getPin: (id) => dispatch(getPin(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (Pin);
