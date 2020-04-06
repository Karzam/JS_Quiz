import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Link, useHistory } from 'react-router-dom'
import { GridSpinner } from 'react-spinners-kit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faArrowAltCircleRight, faChartLine } from '@fortawesome/free-solid-svg-icons'
import { loader } from 'graphql.macro'
import './style.scss'

const moment = require('moment')

const QUERY = loader('./query.gql')

const ResultSetsView = () => {
  const history = useHistory()
  const { data, loading } = useQuery(QUERY)

  if (loading) {
    return (
      <div className="loader">
        <GridSpinner size={60} color="white" loading={true} />
      </div>
    )
  }

  const scores = data.resultSets.map(r => r.correctAnswersCount)
  const averageScore = Math.round((scores.reduce((a, c) => a + c) / scores.length) * 10) / 10

  const resultSetCards = data.resultSets.map(resultSet =>
    <button key={ resultSet.id } className="item" onClick={ () => history.push(`/results/${resultSet.id}`, { id: resultSet.id }) }>
      <div className="label">
        <div className="dateTime">
          <span className="date">{ moment(resultSet.dateTime).format('D MMMM YY') }</span>
          <span className="time">{ moment(resultSet.dateTime).format('h:mm a') }</span>
        </div>
          <span className="score">{ `${resultSet.correctAnswersCount} /10` }</span>
      </div>

      <FontAwesomeIcon className="icon" icon={ faArrowAltCircleRight } />
    </button>
  )

  return (
    <div className="result-sets-view">
      <div className="sup">
        <div className="score">
          <FontAwesomeIcon icon={ faChartLine } />
          {`Average score: ${averageScore} /10`}
        </div>

        <Link className="link" to={{ pathname: '/' }}>
          <FontAwesomeIcon icon={ faHome } />
          { 'Home' }
        </Link>
      </div>

      <div className="resultSets">
        { resultSetCards }
      </div>
    </div>
  )
}

export default ResultSetsView