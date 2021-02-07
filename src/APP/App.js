import React from 'react'
import './App.css'

import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import HomePage from '../containers/Home'
import AboutMe from '../containers/AboutMe'
import Archieves from '../containers/Archieves'
import BackStage from '../containers/BackStage'
import Error404 from '../containers/ErrorPage'

let redirectPath = '/home'

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact strict path="/" render={() => <Redirect to={{ pathname: redirectPath }} />} />
        <Route path="/home" component={HomePage} />
        <Route path="/archieves/:workId" component={Archieves} />
        <Route path="/backstage" component={BackStage} />
        <Route path="/aboutMe" component={AboutMe} />
        <Route component={Error404} />
      </Switch>
    </HashRouter>
  )
}

export default App
