import { configureStore } from '@reduxjs/toolkit';
import userSliceReducer from '../state/userSlice';
import wourkoutSliceReducer from '../state/workoutSlice';

export default configureStore({
  reducer: {
    userState: userSliceReducer,
    workoutState: wourkoutSliceReducer,
  },
});