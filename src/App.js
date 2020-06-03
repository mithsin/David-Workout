import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
// import { createUseStyles } from 'react-jss';
import { useSelector, useDispatch } from 'react-redux';

import Login from './routes/Login';
import SignUp from './routes/SignUp';
import HomeRandom from './routes/HomeRandom';

import {
  isAuthorized,
  setEnterCredentials
} from './state/userSlice'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authorized = useSelector( isAuthorized );
  const dispatch = useDispatch();

  authorized ? dispatch(setEnterCredentials(false)) : dispatch(setEnterCredentials(true));

  return (
    <Route {...rest} render={(props) => (
      authorized === true
        ? <Component {...props} />
        : <Redirect to='/' />
    )} />
  )
};

function App() {
  return (
    <div>
      {/* <Header /> */}
      <div>
        <Switch>
          <Redirect from="/signin" to="/" />
          <Route exact path="/" component = { Login } />
          <Route exact path="/signup" component = { SignUp } />
          <Route exact path="/signin" />
          <PrivateRoute exact path="/home-random" component = { HomeRandom } />
        </Switch>
      </div>
    </div>
  );
}

export default App;
