import {
  GET_PROFILE,
  GET_PROFILE_ERROR,
  CLEAR_PROFILE
} from '../actions/types';

var initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  var { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case GET_PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        error: payload
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false
      };
    default:
      return state;
  }
}
