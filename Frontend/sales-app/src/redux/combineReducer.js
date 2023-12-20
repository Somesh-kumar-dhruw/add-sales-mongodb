// Import the 'combineReducers' function from the 'redux' library.
import { combineReducers } from 'redux';

// Import the 'userReducer' from the 'userReducer.js' file (assuming it's located there).
import { userReducer } from './userReducer';

// Combine reducers by creating a rootReducer.
export const rootReducer = combineReducers({
  // Create a property 'userReducer' in the rootReducer and assign the 'userReducer' imported above to it.
  userReducer: userReducer
});