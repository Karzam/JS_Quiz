import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'

import './index.scss'
import HomeView from './components/views/HomeView/HomeView'
import QuizView from './components/views/QuizView/QuizView'

const client = new ApolloClient({ uri: 'https://eu1.prisma.sh/baptiste-menard-24df76/js_quiz/dev' })

ReactDOM.render(
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
      <Router>
        <Fragment>
          <nav>
            <div className="wrapper">
              <span className="logo" role="img" aria-label="logo">⚡_</span>
              <span className="title">js quiz</span>
            </div>
          </nav>
          <div className="view">
            <Switch>
              <Route exact path="/" component={HomeView} />
              <Route exact path="/quiz/:level" component={QuizView} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </ApolloHooksProvider>
  </ApolloProvider>,
  document.getElementById('root'),
)
