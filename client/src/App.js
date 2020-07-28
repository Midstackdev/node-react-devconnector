import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import jwtDecode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setAuthUser, logoutUser } from './actions/auth'

import Navbar from './components/layouts/Navbar'
import Footer from './components/layouts/Footer'
import Landing from './components/layouts/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Dashboard from './components/dashboard/Dashboard'
import CreateProfile from './components/profile/CreateProfile'
import EditProfile from './components/profile/EditProfile'
import AddExperience from './components/profile/AddExperience'
import AddEducation from './components/profile/AddEducation'

import PrivateRoute from './components/common/PrivateRoute'

import './App.css';
import store from './store'
import { clearProfile } from './actions/profile';
import Profiles from './components/profiles/Profiles';
import ProfileHandle from './components/profiles/ProfileHandle';
import NotFound from './components/notfound/NotFound'

//check for token 
if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken)

  const decoded = jwtDecode(localStorage.jwtToken)

  store.dispatch(setAuthUser(decoded))

  //check for expired token
  const currentTime = Date.now() / 1000
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser())

    store.dispatch(clearProfile())

    window.location.href = '/login'
  }
}

class App extends Component {
  render () {
    return (
      <Provider store={ store }>
        <Router>
          <div className="App">
            <Navbar />
              <Route path="/" exact component={Landing} />
              <div className="container">
                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={Register} />
                <Route path="/profiles" exact component={Profiles} />
                <Route path="/profile/:handle" exact component={ProfileHandle} />
                <Switch>
                  <PrivateRoute path="/dashboard" exact component={Dashboard} />
                  <PrivateRoute path="/create-profile" exact component={CreateProfile} />
                  <PrivateRoute path="/edit-profile" exact component={EditProfile} />
                  <PrivateRoute path="/add-experience" exact component={AddExperience} />
                  <PrivateRoute path="/add-education" exact component={AddEducation} />
                </Switch>
                <Route path="/not-found" exact component={NotFound} />
              </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
