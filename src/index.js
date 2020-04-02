import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from '../src/stores/reducers'
import Auth from './utils/auth'
import App from './components/App/App'
import { LOCALHOST } from './utils/urls'

require('dotenv').config()

const store = createStore(reducer)

const authToken = Auth.get()

const client = new ApolloClient({
  uri: LOCALHOST,
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
      <Provider store={ store }>
        <Router>
          <App />
        </Router>
      </Provider>
    </ApolloHooksProvider>
  </ApolloProvider>,
  document.getElementById('root'),
)
