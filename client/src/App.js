import React, { Fragment, useEffect } from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ProtectedRoute from './routing/ProtectedRoute';
import setAuthToken from './util/setAuthToken';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import Profile from './components/profile/Profile';
import Profiles from './components/profiles/Profiles';
import CreateProfile from './components/profile-form/CreateProfile';
import EditProfile from './components/profile-form/EditProfile';
import AddExperience from './components/profile-form/AddExperience';
import AddEducation from './components/profile-form/AddEducation';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';

function App() {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/profiles' component={Profiles} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/create-profile' component={CreateProfile} />
              <ProtectedRoute
                exact
                path='/edit-profile'
                component={EditProfile}
              />
              <ProtectedRoute exact path='/dashboard' component={Dashboard} />
              <ProtectedRoute exact path='/profile/:id' component={Profile} />
              <ProtectedRoute
                exact
                path='/add-experience'
                component={AddExperience}
              />
              <ProtectedRoute
                exact
                path='/add-education'
                component={AddEducation}
              />
              {/* <Route exact path='/dashboard' component={Dashboard} /> */}
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
