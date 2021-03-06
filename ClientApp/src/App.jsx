import React, { Component } from 'react'
import { Route, Switch } from 'react-router'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import HelloWorld from './pages/_template/HelloWorld'
import HeyWorld from './pages/_template/HeyWorld'
import NotFound from './pages/NotFound'
import SleepQuality from './pages/SleepQuality'
import Activate from './pages/Activate'
import Stats from './pages/Stats'
import './custom.scss'
export default class App extends Component {
  static displayName = App.name

  render() {
    return (
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/quality/:SleepCounterId"
            component={SleepQuality}
          />
          <Route exact path="/activate/:SleepCounterId" component={Activate} />
          <Route exact path="/stats" component={Stats} />
          <Route exact path="/counter" component={HelloWorld} />
          <Route exact path="/typescript" component={HeyWorld} />
          <Route exact path="*" component={NotFound} />
        </Switch>
      </Layout>
    )
  }
}
