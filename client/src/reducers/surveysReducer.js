import { FETCH_SURVEYS, FETCH_SURVEY, DELETE_SURVEY } from "../actions/types";

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_SURVEYS:
      return action.payload;
    case FETCH_SURVEY:
      return { ...state, [action.payload._id]: action.payload };
    case DELETE_SURVEY:
      return state;
    default:
      return state;
  }
}


/*
Originally it was the following:

import { FETCH_SURVEYS } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_SURVEYS:
      return action.payload;
    default:
      return state;
  }
}

*/