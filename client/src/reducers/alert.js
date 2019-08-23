import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

var initialState = [];

export default function(state = initialState, action) {
  var { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return [...initialState, payload];
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== payload);
    default:
      return state;
  }
}
