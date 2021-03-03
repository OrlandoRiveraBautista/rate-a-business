import { ACTION_TYPES } from "./action";
import { combineReducers } from "redux";

const businessesReducer = (state = null, action) => {
  if (action.type == ACTION_TYPES.UPDATE_BUSINESSES) {
    return action.payload;
  }

  return state;
};

const setLocationReducer = (state = null, action) => {
  if (action.type == ACTION_TYPES.SET_LOCATION) {
    return action.payload;
  }

  return state;
};

const setDistanceReducer = (state = 8046, action) => {
  if (action.type == ACTION_TYPES.SET_DISTANCE) {
    return action.payload;
  }

  return state;
};

const setBusinessTypeReducer = (state = "restaurant", action) => {
  if (action.type == ACTION_TYPES.SET_BUSINESS_TYPE) {
    return action.payload;
  }

  return state;
};

export default combineReducers({
  businesses: businessesReducer,
  currentLocation: setLocationReducer,
  currentDistance: setDistanceReducer,
  currentBusinessType: setBusinessTypeReducer,
});
