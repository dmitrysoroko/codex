import { render } from 'react-dom'
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Repos from './components/Repos'
import Repo from './components/Repo'

const containerEl = document.getElementById('container')

render(
  <BrowserRouter>
    <main>
      <Switch>
        <Route exact path='/' component={Repos}/>
        <Route path='/repo/:name' component={Repo}/>
      </Switch>
    </main>
  </BrowserRouter>,
  containerEl
)
