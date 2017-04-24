import { connect } from 'react-redux';
import { editPin, deletePin } from '../../actions/pin_actions';
import PinEdit from './pin_edit';

const mapDispatchToProps = (dispatch) => {
   return {
    editPin: (pin) => dispatch(editPin(pin)),
    deletePin: (id) => dispatch(deletePin(id))
  }
};

export default connect(
  null,
  mapDispatchToProps)
  (PinEdit);
