import axios from 'axios';
import {
    CognitoUserPool,
    CognitoUserAttribute,
    CognitoUser,
} from 'amazon-cognito-identity-js';

// AWS Setup
const poolData = {
    UserPoolId: process.env.REACT_APP_USER_POOL,
    ClientId: process.env.REACT_APP_CLIENT_ID
};

const userPool = new CognitoUserPool(poolData);
const attributeList = [];

// AWS Cognito User SiSign Up
export const signUpAccount = (eMail, phoneNumber, password, authInput) => {
    const postURL = "https://uwbx85xxs4.execute-api.us-east-1.amazonaws.com/api/user";
    const dataEmail = {
        Name: 'email',
        Value: eMail,
    };
        
    const dataPhoneNumber = {
        Name: 'phone_number',
        Value: phoneNumber,
    };

    const attributeEmail = new CognitoUserAttribute(dataEmail);
    const attributePhoneNumber = new CognitoUserAttribute(
        dataPhoneNumber
    );

    attributeList.push(attributeEmail);
    attributeList.push(attributePhoneNumber);

    userPool.signUp( eMail, password, attributeList, null, function(
        err,
        result
    ) {
        if (err) {
            alert(err.message || JSON.stringify(err));
            return;
        }
        var cognitoUser = result.user;
        alert('user name is ' + cognitoUser.getUsername() + 'Please check your email for verification code');
        axios.post(postURL, JSON.stringify({...authInput, UserId: result.userSub}), {
            headers: { 'Content-Type' : 'application/json' }
          })
          .then(res => {
              console.log(res)
          })
    })
}

// AWS Cognito Verification 
export const verificationAccount = (eMail, code) => {
    // const postURL = "https://uwbx85xxs4.execute-api.us-east-1.amazonaws.com/api/user";

    const userData = {
        Username: eMail,
        Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmRegistration(code, true, function(err, result) {
        if (err) {
            alert(err.message || JSON.stringify(err));
            return;
        }
        alert('call result: ' + result);
    })
}

