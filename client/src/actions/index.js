import axios from "axios";
import { FETCH_USER, FETCH_SURVEYS, FETCH_SURVEY, DELETE_SURVEY, SAVE_SURVEY } from "./types";
//import history from "../history"

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/api/current_user");

  dispatch({ type: FETCH_USER, payload: res.data });
};

/*update credits
export const handleToken = (token) => async (dispatch) => {
  const res = await axios.post("/api/stripe", token);

  dispatch({ type: FETCH_USER, payload: res.data });
};*/

//save and send a survey
export const submitSurvey = (values, history) => async (dispatch) => {
  const res = await axios.post("/api/surveys", values);

  history.push("/surveys");
  dispatch({ type: FETCH_USER, payload: res.data });
};

//get one survey
export const fetchSurvey = (id) => async (dispatch) => {
  const res = await axios.get(`/api/surveys/${id}`);
 
  dispatch({ type: FETCH_SURVEY, payload: res.data });
};

//get all surveys from a user
export const fetchSurveys = () => async (dispatch) => {
  const res = await axios.get("/api/surveys");
 
  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};

//delete attempt
export const deleteSurvey = (id, history) => async (dispatch) => {
  const res = await axios.post(`/api/surveys/delete/${id}`);

  history.push("/surveys");

  dispatch({ type: DELETE_SURVEY, payload: res.data });
};
//save a new draft
export const saveSurvey = (values, history) => async (dispatch) => {
  const res = await axios.post("/api/surveys/save", values);

  dispatch({ type: SAVE_SURVEY, payload: res.data });
  history.push("/surveys");

}

