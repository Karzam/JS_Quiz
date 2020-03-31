import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import Auth from './utils/auth'
import App from './components/App/App'

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
        <App />
      </Router>
    </ApolloHooksProvider>
  </ApolloProvider>,
  document.getElementById('root'),
)
