import React, { Fragment, useEffect } from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { useDispatch } from 'react-redux'
import { setUser } from '../../stores/actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode } from '@fortawesome/free-solid-svg-icons'
import { loader } from 'graphql.macro'
import Auth from '../../utils/auth'
import HomeView from '../views/HomeView/HomeView'
import LevelView from '../views/LevelView/LevelView'
import Profile from '../common/Profile/Profile'
import QuizView from '../views/QuizView/QuizView'
import RedirectView from '../views/RedirectView/RedirectView'
import ResultSetsView from '../views/ResultSetsView/ResultSetsView'
import ResultView from '../views/ResultView/ResultView'
import './style.scss'

const QUERY = loader('./query.gql')

const App = () => {
  const { data, error } = useQuery(QUERY)
  const dispatch = useDispatch()

  useEffect(() => {
    if (error) {
      Auth.clear()
    }

    if (data) {
      dispatch(setUser(data.me))
    }
  }, [data, error])

  return (
    <Fragment>
      <nav>
        <Link className="wrapper" to={{ pathname: '/' }}>
          <FontAwesomeIcon className="icon" icon={ faCode } />
          <span className="title">{ 'JS Quiz' }</span>
        </Link>

        <Profile />
      </nav>
      <div className="view">
        <Switch>
          <Route exact path="/" component={ HomeView } />
          <Route exact path="/auth" component={ RedirectView } />
          <Route exact path="/quiz" component={ LevelView } />
          <Route exact path="/quiz/:level" component={ QuizView } />
          <Route exact path="/results" component={ ResultSetsView } />
          <Route exact path="/results/:id" component={ ResultView } />
        </Switch>
      </div>
    </Fragment>
  )
}

export default App