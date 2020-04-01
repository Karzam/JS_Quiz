import React, { Fragment, useState, useEffect } from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode } from '@fortawesome/free-solid-svg-icons'
import { loader } from 'graphql.macro'
import HomeView from '../views/HomeView/HomeView'
import LevelView from '../views/LevelView/LevelView'
import Profile from '../common/Profile/Profile'
import QuizView from '../views/QuizView/QuizView'
import RedirectView from '../views/RedirectView/RedirectView'
import ResultView from '../views/ResultView/ResultView'
import './style.scss'
import Auth from '../../utils/auth'

const QUERY = loader('./query.gql')

const App = () => {
  const { data, error } = useQuery(QUERY)
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (error) {
      Auth.reset()
    }

    if (data) {
      setUser({ ...data })
    }
  }, [data, error])

  return (
    <Fragment>
      <nav>
        <Link className="wrapper" to={{ pathname: '/' }}>
          <FontAwesomeIcon className="icon" icon={ faCode } />
          <span className="title">JS Quiz</span>
        </Link>

        <Profile user={ user ? user.me : null } />
      </nav>
      <div className="view">
        <Switch>
          <Route exact path="/" component={ HomeView } />
          <Route exact path="/auth" component={ RedirectView } />
          <Route exact path="/quiz" component={ LevelView } />
          <Route exact path="/quiz/:level" component={ QuizView } />
          <Route exact path="/result" component={ ResultView } />
        </Switch>
      </div>
    </Fragment>
  )
}

export default App