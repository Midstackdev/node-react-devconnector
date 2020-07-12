import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import Navbar from './components/layouts/Navbar'
import Footer from './components/layouts/Footer'
import Landing from './components/layouts/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'

import './App.css';
import store from './store'

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
              </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
