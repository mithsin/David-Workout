import React, { useState } from 'react';
import { signUpAccount, verificationAccount } from '../common';
import { Link } from 'react-router-dom'
import './styles.scss';

const SignUp = () => {
    const [authInput, setAuthInput] = useState({});
    const [vInput, setVInput] = useState({});
    // store all input changes
    const formInputChange = (e) => {
        setAuthInput({ 
            ...authInput, 
            [e.target.name] : e.target.type === 'number' ? parseInt(e.target.value) : e.target.value.toLowerCase()
        })
    };
    const formVInputChange = (e) => {
        setVInput({ 
            ...vInput, 
            [e.target.name] : e.target.type === 'number' ? parseInt(e.target.value) : e.target.value.toLowerCase()
        })
    };

    const clearInputs = () => {
        setAuthInput({userName: '', phone: '', password: '' })
        setVInput({userName: '', vCode: ''})
    };

    const workoutFormSubmit = () => {
        signUpAccount(authInput.userName, `+1${authInput.phone}`, authInput.password, authInput)
        clearInputs()
    }

    const workoutVFormSubmit = () => {
        verificationAccount( vInput.userName, vInput.vCode );
        clearInputs()
    }

    const inputSettings = [
        {
            type: "text",
            name: "userName", 
            placeholder: "User Account e-mail",
            value: authInput.userName
        },
        {
            type: "text",
            name: "phone", 
            placeholder: "example 9876543210",
            value: authInput.phone
        },
        {
            type: "password",
            name: "password", 
            placeholder: "Password",
            value: authInput.password
        }
    ];

    const VarifyInputSettings = [
        {
            type: "text",
            name: "userName", 
            placeholder: "User Account e-mail",
            value: vInput.userName
        },
        {
            type: "password",
            name: "vCode", 
            placeholder: "Verfication Code",
            value: vInput.vCode
        }
    ];

    return(
        <div className="outter-block"> 
            <div className="inner-block">
            <Link to='/'><button>back to sign in</button></Link>
                <div className="formWrapper">
                    <div>Register</div>
                        {
                            inputSettings.map((inputSetting)=>
                                <input 
                                    key={inputSetting.name} 
                                    { ...inputSetting } 
                                    onChange={ formInputChange } />
                            )
                        }
                        <button onClick={ workoutFormSubmit }>submit</button>
                        <button onClick={ clearInputs }>Clear</button>
                </div>
                <hr/>
                <div className="formWrapper">
                    <div>Verification Code</div>
                        {
                            VarifyInputSettings.map((inputSetting)=>
                                <input key={inputSetting.name} { ...inputSetting } onChange={ formVInputChange } />
                            )
                        }
                        <button onClick={ workoutVFormSubmit }>submit</button>
                </div>
            </div>
        </div>
    )
}

export default SignUp;