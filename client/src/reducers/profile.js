import {
  GET_PROFILE,
  GET_PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_ALL_PROFILES,
  GET_GITHUB_REPO
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
    case GET_ALL_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      };
    case GET_PROFILE:
    case UPDATE_PROFILE:
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
    case GET_GITHUB_REPO:
      return {
        ...state,
        repos: payload,
        loading: false
      };
    default:
      return state;
  }
}
