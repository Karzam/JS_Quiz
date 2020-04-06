import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'
import { GridSpinner } from 'react-spinners-kit'
import QuizProvider from '../../common/QuizProvider/QuizProvider'
import { loader } from 'graphql.macro'
import './style.scss'

const QUERY = loader('./query.gql')
const CREATE_RESULT_SET = loader('./createResultSet.gql')

const QuizView = (props) => {
  const Level = {
    beginner: 'BEGINNER',
    intermediate: 'INTERMEDIATE',
    advanced: 'ADVANCED',
  }
  
  const history = useHistory()
  const [transitionAnimation, setTransitionAnimation] = useState('transition')
  const [createResultSet, { loading: mutating }] = useMutation(CREATE_RESULT_SET)


  // Triggers transition animation
  const onNext = () => {
    setTransitionAnimation('transition')
  }

  // When completed, send answers to server and redirect to results
  const onEnd = async(answers) => {
    const results = await createResultSet({
      variables: {
        input: answers
      }
    })

    const resultSetId = results.data.createResultSet.id

    return history.replace(`/results/${resultSetId}`, { id: resultSetId })
  }

  const { loading, data } = useQuery(QUERY, {
    variables: {
      level: Level[props.match.params.level],
    }
  })
  
  if (loading || mutating) {
    return (
      <div className="loader">
        <GridSpinner size={60} color="white" loading={true} />
      </div>
    )
  }

  return (
    <div className={`quiz-view ${transitionAnimation}`} onAnimationEnd={() => setTransitionAnimation('')}>
      { data && <QuizProvider props={{ data, onNext, onEnd }} /> }
    </div>
  )
}

export default QuizView