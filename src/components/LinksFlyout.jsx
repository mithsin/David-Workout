import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom'
import {
  CognitoUserPool
} from 'amazon-cognito-identity-js';
import menuSvg from './svg/menu.svg';
import closeSvg from './svg/close.svg';
import "./styles.scss";

const LinksFlyout = () => {
  const [showFlyout, setShowFlyout] = useState(false);
  const poolData = {
    UserPoolId: process.env.REACT_APP_USER_POOL,
    ClientId: process.env.REACT_APP_CLIENT_ID
  };
  const userPool = new CognitoUserPool(poolData);
  let history = useHistory();
  const logoutFunction = () => {
    if(userPool.getCurrentUser()){
        userPool.getCurrentUser().signOut();
        history.push("/")
        alert("you are now signout")
    } else {
        console.log("user not available")
        alert("you are not login yet")
    }
  };

  const taggleFlyout = () => {
    setShowFlyout(!showFlyout);
  }

  const buttonList = [
    {
      link: "/home-random",
      title: "HOME WORKOUT"
    }
  ]

  return (
    <div className="flyout-workout-block">
      <div className="flyout-workout-inner-block">
          <img src={ showFlyout ? closeSvg : menuSvg } alt="menu" className="flyoutIcon" onClick={ taggleFlyout }/>
          { showFlyout &&
            <div className="flyoutList">
              {
                buttonList.map(flyoutList => {
                  return (
                    <Link key={ flyoutList.title } to={ flyoutList.link }>
                      <button key={ flyoutList.title } >
                        { flyoutList.title }
                      </button>
                    </Link>)
                })
              }
              <button onClick={ logoutFunction }>SIGN OUT</button>
            </div>
          }
      </div>
    </div>
  );
}

export default LinksFlyout;
