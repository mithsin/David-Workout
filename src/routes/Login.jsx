import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
    CognitoUserPool,
    CognitoUser,
    AuthenticationDetails
} from 'amazon-cognito-identity-js';
import AWS from 'aws-sdk';
import './styles.scss';

import {
    setSignedState,
    setEnterCredentials,
    setVerifiedUser
} from '../state/userSlice';
import {
    getRandomWorkout,
    setRandomWorkoutState
} from '../state/workoutSlice';

const Login = () => {
    const [authInput, setAuthInput] = useState({});
    const dispatch = useDispatch();

    let history = useHistory();
    const authenticationData = {
        Username: authInput.userName,
        Password: authInput.password
    };
    const authenticationDetails = new AuthenticationDetails(
        authenticationData
    );
    const poolData = {
        UserPoolId: process.env.REACT_APP_USER_POOL,
        ClientId: process.env.REACT_APP_CLIENT_ID
    };
    const userPool = new CognitoUserPool(poolData);
    const userData = {
        Username: authInput.userName,
        Pool: userPool
    };
    const cognitoUserState = userPool.getCurrentUser();
    if (cognitoUserState != null) {
        cognitoUserState.getSession(function(err, session) {
            if (err) {
                alert(err.message || JSON.stringify(err));
                return;
            }
            console.log('session validity: ' + session.isValid());
     
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId: 'us-east-1:60aa3c5a-ef07-4fb6-8f55-7a0744eb9015', // your identity pool id here
                Logins: {
                    // Change the key below according to the specific region your user pool is in.
                    'cognito-idp.us-east-1.amazonaws.com/us-east-1_hThEVDq8g': session
                        .getIdToken()
                        .getJwtToken(),
                },
            });
     
            dispatch(setSignedState(true));
            dispatch(setEnterCredentials(true));
            dispatch(setVerifiedUser(true));
            dispatch(setRandomWorkoutState(JSON.parse(localStorage.randomWorkout)));
            history.push("/home-random")
        });
    }

    const workoutFormSubmit = () => {
        var cognitoUser = new CognitoUser(userData);
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function(result) {
                dispatch(setSignedState(true));
                dispatch(setEnterCredentials(true));
                dispatch(setVerifiedUser(true));
                dispatch(getRandomWorkout())
                history.push("/home-random")
            },
        
            onFailure: function(err) {
                alert(err.message || JSON.stringify(err));
            },
        });
    };
    // Logout function
    const logoutFunction = async() => {
        if(userPool.getCurrentUser()){
            await localStorage.clear();
            localStorage.removeItem('randomWorkout');
            dispatch(setSignedState(false));
            dispatch(setEnterCredentials(false));
            dispatch(setVerifiedUser(false));
            userPool.getCurrentUser().signOut();
        } else {
            console.log("user not available")
            alert("you are not login yet")
        }
    };


    // store all input changes
    const formInputChange = (e) => {
        setAuthInput({ 
            ...authInput, 
            [e.target.name] : e.target.type === 'number' ? parseInt(e.target.value) : e.target.value.toLowerCase()
        })
    };

    const inputSettings = [
        {
            type: "email",
            name: "userName", 
            placeholder: "User Account e-mail"
        },
        {
            type: "password",
            name: "password", 
            placeholder: "Password"
        }
    ];
    // eslint-disable-next-line no-lone-blocks
    return(
        <div className="outter-block">
            <div className="inner-block">
                <div>Register</div>
                <div className="form-container">
                {
                        inputSettings.map((inputSetting)=>
                            <input key={inputSetting.name} { ...inputSetting } onChange={ formInputChange } />
                        )
                    }
                    <button onClick={ workoutFormSubmit }>submit</button>
                </div>
                <button className="logoutbutton" onClick={logoutFunction}>Logout</button>
                <span>Dont have a account? <Link to="/signup"> click here</Link></span>
            </div>
        </div>
    )
}

export default Login;