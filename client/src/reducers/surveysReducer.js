import { FETCH_SURVEYS, FETCH_SURVEY, DELETE_SURVEY } from "../actions/types";
import _ from "lodash";

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_SURVEYS:
      return {...state, ...action.payload};
    case FETCH_SURVEY:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_SURVEY:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
}
