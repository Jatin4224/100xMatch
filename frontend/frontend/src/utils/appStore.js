import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer, { removeUser } from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice";
import requestReducer from "./requestSlice";

const appReducer = combineReducers({
  user: userReducer,
  feed: feedReducer,
  connections: connectionReducer,
  requests: requestReducer,
});

// logging out wipes everything so the next user starts clean
const rootReducer = (state, action) =>
  appReducer(action.type === removeUser.type ? undefined : state, action);

const appStore = configureStore({
  reducer: rootReducer,
});

export default appStore;
