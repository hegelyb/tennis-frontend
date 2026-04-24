import { configureStore } from '@reduxjs/toolkit';

import counterReducer from '../features/counter/counterSlice';
import tennisReducer from '../features/tennisSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    tennis: tennisReducer,
  },
});
