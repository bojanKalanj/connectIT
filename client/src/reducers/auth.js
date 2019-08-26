import { REGISTER_FAIL, REGISTER_SUCCES } from '../actions/types';

var initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  user: null
};

export default function(state = initialState, action) {
  var { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCES:
      return {
        ...state,
        ...payload,
        loading: false
      };
    case REGISTER_FAIL:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: flse
      };
  }
}
