import { configureStore } from '@reduxjs/toolkit';

// Add a simple reducer to silence the warning
const initialState = {};

function appReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export const store = configureStore({
  reducer: {
    app: appReducer
  },
});
