import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import surveysReducer from "./surveysReducer";
import surveyReducer from "./surveyReducer";


export default combineReducers({
  surveys: surveysReducer,
  survey: surveyReducer,
  auth: authReducer,
  form: reduxForm,
});
