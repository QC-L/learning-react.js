import React, { Component } from 'react'
import './App.css'
import Home from './components/Home'
import About from './components/About'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about/1009">About</Link></li>
          </ul>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path={`/about/:id?`} component={About}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App
