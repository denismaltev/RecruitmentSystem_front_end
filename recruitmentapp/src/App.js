import React from 'react';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LogIn from './pages/LogIn'
import Home from './pages/Home'


export default class App extends React.Component{
  
  render() {
    return (
      <div className="App">
        <Router hashType='hashbang'>
        <div>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={LogIn} />
          </Switch>
        </div>
        </Router>
      </div>
    )
  }
}

