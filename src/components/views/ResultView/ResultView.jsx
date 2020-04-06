import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import { GridSpinner } from 'react-spinners-kit'
import ResultCard from '../../common/ResultCard/ResultCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faTrophy } from '@fortawesome/free-solid-svg-icons'
import { loader } from 'graphql.macro'
import './style.scss'

const moment = require('moment')

const QUERY = loader('./query.gql')

const ResultView = (props) => {
  const id = props.match.params.id

  const { data, loading } = useQuery(QUERY, { variables: { id }})

  if (loading) {
    return (
      <div className="loader">
        <GridSpinner size={60} color="white" loading={true} />
      </div>
    )
  }

  const { results, dateTime } = data.resultSet || {}

  const questionsCount = results.length
  const correctAnswersCount = results.filter(r => r.answer && r.answer.id === r.correctAnswer.id).length

  const resultCards = results.map((result, index) =>
    <ResultCard key={ result.id } props={{ index: index + 1, ...result }} />
  )

  return (
    <div className="result-view">
      <div className="head">
        <div className="sup">
          <div className="score">
            <FontAwesomeIcon icon={ faTrophy } />
            { `Score: ${correctAnswersCount} /${questionsCount}` }
          </div>

          <Link className="link" to={{ pathname: '/' }}>
            <FontAwesomeIcon icon={ faHome } />
            { 'Home' }
          </Link>
        </div>

        <span className="datetime">{ moment(dateTime).format('D MMMM YY, h:mm a') }</span>
      </div>

      <div>
        { resultCards }
      </div>
    </div>
  )
}

export default ResultView