import React, { Component } from 'react'
import { Route, Switch } from 'react-router'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import HelloWorld from './pages/_template/HelloWorld'
import HeyWorld from './pages/_template/HeyWorld'
import NotFound from './pages/NotFound'
import SleepQuality from './pages/SleepQuality'
import Activate from './pages/Activate'
import AlarmOff from './pages/AlarmOff'
import './custom.scss'
export default class App extends Component {
  static displayName = App.name

  render() {
    return (
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/quality" component={SleepQuality} />
          <Route exact path="/activate/:SleepCounterId" component={Activate} />
          <Route exact path="/off" component={AlarmOff} />
          <Route exact path="/counter" component={HelloWorld} />
          <Route exact path="/typescript" component={HeyWorld} />
          <Route exact path="*" component={NotFound} />
        </Switch>
        <header>
          <nav className="navBar">
            <li className="navItem">Sleep</li>
            <li className="navItem">Stats</li>
            <li className="navItem">Pref</li>
          </nav>
        </header>{' '}
      </Layout>
    )
  }
}
