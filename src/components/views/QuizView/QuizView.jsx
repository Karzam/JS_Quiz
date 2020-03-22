import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'
import { gql } from 'apollo-boost'
import { GridSpinner } from 'react-spinners-kit'
import QuizProvider from '../../QuizProvider/QuizProvider'
import './index.scss'

const QuizView = (props) => {
  const QUESTIONS = gql`
    query questions($level: Level!) {
      questions(where: { level: $level }) {
        id
        level
        title
        code
        answers {
          id
          text
        }
      }
    }
  `

  const CREATE_RESULT = gql`
    mutation sendQuestionsAnswers($input: [QuestionAnswerInput]!) {
      sendQuestionsAnswers(data: $input) {
        id
      }
    }
  `

  const Level = {
    beginner: 'BEGINNER',
    intermediate: 'INTERMEDIATE',
    advanced: 'ADVANCED',
  }
  
  const history = useHistory()
  const [transitionAnimation, setTransitionAnimation] = useState('transition')
  const [createResult, { results }] = useMutation(CREATE_RESULT)


  // Triggers transition animation
  const onNext = () => {
    createResult({
      variables: {
      }
    })

    setTransitionAnimation('transition')
  }

  // When completed, send answers to server and redirect to results
  const onEnd = () => {
    history.replace('/results')
  }

  const { loading, error, data } = useQuery(QUESTIONS, {
    variables: {
      level: Level[props.match.params.level],
    }
  })
  
  if (loading) {
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