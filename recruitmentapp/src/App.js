import React from 'react';
import logo from './logo.svg';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom'
import './App.css';
import LogIn from './pages/LogIn'
import Home from './pages/Home'

export default class App extends React.Component{
  
  render() {
    return (
      <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    */}
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

