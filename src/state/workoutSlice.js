import { createSlice } from '@reduxjs/toolkit';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import axios from 'axios';

export const workoutSlice = createSlice({
  name: 'workoutState',
  initialState: {
    random: {}
  },
  reducers: {
    setRandomWorkoutState: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.random = action.payload;
    },
  },
});

export const { setRandomWorkoutState } = workoutSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

export const getRandomWorkout = () => dispatch => {
    //--------------
    const poolData = {
      UserPoolId: process.env.REACT_APP_USER_POOL,
      ClientId: process.env.REACT_APP_CLIENT_ID
    };
      const userPool = new CognitoUserPool(poolData);

    if(userPool.getCurrentUser()){
      userPool.getCurrentUser().getSession((err, session)=>{
        const queryParam = '?accessToken=' + session.getAccessToken().getJwtToken();
        let urlParam = 'all'
        axios.get(`https://uwbx85xxs4.execute-api.us-east-1.amazonaws.com/api/workout/random/` + urlParam + queryParam, {
          headers: { 'Authorization' : session.getIdToken().getJwtToken() }
        })
          .then(res => {
            dispatch(setRandomWorkoutState(res.data));
            localStorage.setItem('randomWorkout', JSON.stringify(res.data));
          })
          .catch(err => console.log(err))
      })
    }
    //-------------
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const randomWorkout = state => state.workoutState.random;

export default workoutSlice.reducer;
