import React from 'react'
import { Link } from 'react-router-dom'
import ResultCard from '../../ResultCard/ResultCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faTrophy } from '@fortawesome/free-solid-svg-icons'
import './style.scss'

const ResultView = ({ location }) => {
  const results = location.state.results

  const questionsCount = results.length
  const correctAnswersCount = results.filter(r => r.answer && r.answer.id === r.correctAnswer.id).length

  const resultCards = results.map((result, index) =>
    <ResultCard key={ result.id } props={{ index: index + 1, ...result }} />
  )

  return (
    <div className="result-view">
      <div className="sup">
        <div className="score">
          <FontAwesomeIcon icon={ faTrophy } />
          {`Score: ${correctAnswersCount}/${questionsCount}`}
        </div>

        <Link className="link" to={{ pathname: '/' }}>
          <FontAwesomeIcon icon={ faHome } />
          { 'Home' }
        </Link>
      </div>

      <div>
        { resultCards }
      </div>
    </div>
  )
}

export default ResultView