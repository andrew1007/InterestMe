import {combineReducers} from 'redux';
import SessionReducer from './session_reducers.jsx';
import BoardReducer from './board_reducers.jsx'
import PinReducer from './pin_reducers.jsx'
import UserReducer from './user_reducers.jsx'
import FollowReducer from './follow_reducers.jsx'

//adds to state
const rootReducer = combineReducers({
  session: SessionReducer,
  boards: BoardReducer,
  pins: PinReducer,
  user: UserReducer,
  follow: FollowReducer
});

export default rootReducer;
