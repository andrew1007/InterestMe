import { connect } from 'react-redux';
import { getHome } from '../../actions/pin_actions';
import Homepage from './homepage';

const mapStateToProps = ({pins}) => {
  return {pins: pins}
}

const mapDispatchToProps = (dispatch) => ({
  getHome: () => dispatch(getHome())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (Homepage)
