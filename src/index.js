import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode } from '@fortawesome/free-solid-svg-icons'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import HomeView from './components/views/HomeView/HomeView'
import QuizView from './components/views/QuizView/QuizView'
import ResultView from './components/views/ResultView/ResultView'
import './index.scss'

const client = new ApolloClient({ uri: 'http://localhost:4000' })

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
              <Route path="/quiz/:level" component={QuizView} />
              <Route path="/result" component={ResultView} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </ApolloHooksProvider>
  </ApolloProvider>,
  document.getElementById('root'),
)
