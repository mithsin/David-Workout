import {
    CognitoUserPool,
    CognitoUser,
    AuthenticationDetails
} from 'amazon-cognito-identity-js';
import AWS from 'aws-sdk';

const AWSCognito = (userName, userPassword) => {
    const authenticationData = {
        Username: userName,
        Password: userPassword
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
        Username: userName,
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
                dispatch(getRandomWorkout())
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
    const logoutFunction = () => {
        if(userPool.getCurrentUser()){
            dispatch(setSignedState(false));
            dispatch(setEnterCredentials(false));
            dispatch(setVerifiedUser(false));
            
            userPool.getCurrentUser().signOut();
        } else {
            console.log("user not available")
            alert("you are not login yet")
        }
    };
}
