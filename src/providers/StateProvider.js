import React from 'react';
import { useDispatch } from 'react-redux';

import {
isAuthorized,
setSignedState,
setEnterCredentials,
setVerifiedUser
} from '../state/userSlice';
import {
getRandomWorkout
} from '../state/workoutSlice';

const StateContext = React.createContext();

export const StateProvider = ({ children }) => {
    const dispatch = useDispatch();

    const sessionUserdata = sessionStorage.getItem('userData')
    const authenticationDetails = sessionStorage.getItem('authenticationDetails')
    if(sessionUserdata){
        var cognitoUser = new  (JSON.parse(sessionUserdata));
        cognitoUser.authenticateUser(JSON.parse(authenticationDetails), {
            onSuccess: function(result) {
                dispatch(setSignedState(true));
                dispatch(setEnterCredentials(true));
                dispatch(setVerifiedUser(true));
                dispatch(getRandomWorkout())
            },
        
            onFailure: function(err) {
                alert(err.message || JSON.stringify(err));
            },
        });
    }
    return (
        <StateContext.Provider>
            { children }
        </StateContext.Provider>
    )
};

export default StateProvider;