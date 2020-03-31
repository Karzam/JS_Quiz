import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode } from '@fortawesome/free-solid-svg-icons'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import Auth from './utils/auth'
import HomeView from './components/views/HomeView/HomeView'
import LevelView from './components/views/LevelView/LevelView'
import QuizView from './components/views/QuizView/QuizView'
import RedirectView from './components/views/RedirectView/RedirectView'
import ResultView from './components/views/ResultView/ResultView'
import './index.scss'

require('dotenv').config()

const authToken = Auth.get()

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  request: (operation) => {
    operation.setContext({
      headers: {
        authorization: authToken ? `Bearer ${authToken}` : ''
      }
    })
  }
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
      <Router>
        <Fragment>
          <nav>
            <Link className="wrapper" to={{ pathname: '/' }}>
              <FontAwesomeIcon className="icon" icon={faCode} />
              <span className="title">JS Quiz</span>
            </Link>
          </nav>
          <div className="view">
            <Switch>
              <Route exact path="/" component={HomeView} />
              <Route exact path="/auth" component={RedirectView} />
              <Route exact path="/quiz" component={LevelView} />
              <Route exact path="/quiz/:level" component={QuizView} />
              <Route exact path="/result" component={ResultView} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </ApolloHooksProvider>
  </ApolloProvider>,
  document.getElementById('root'),
)
