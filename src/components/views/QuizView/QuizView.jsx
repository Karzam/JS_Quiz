import React, { Fragment, useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { GridSpinner } from 'react-spinners-kit'
import QuestionCard from '../../QuestionCard/QuestionCard'
import AnswerCard from '../../AnswerCard/AnswerCard'
import './index.scss'

const QuizView = (props) => {
  const query = gql`
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

  const COUNTDOWN = 20;

  const Level = {
    beginner: 'BEGINNER',
    intermediate: 'INTERMEDIATE',
    advanced: 'ADVANCED',
  }

  const [countdown, setCountdown] = useState(COUNTDOWN)
  const [answers, setAnswers] = useState([])

  useEffect(() => {
    const interval = setInterval(() => {
      if (countdown === 0) {
        return;
      }

      setCountdown(countdown => countdown - 1 )
    }, 1000)

    return () => clearInterval(interval)
  }, [countdown])

  const { loading, error, data } = useQuery(query, {
    variables: {
      level: Level[props.match.params.level],
    }
  })

  const loader = (
    <div className="loader">
      <GridSpinner size={60} color="white" loading={true} />
    </div>
  )
  
  if (!data) {
    return null
  }

  const currentQuestion = data.questions[answers.length]
  const answerCards = currentQuestion.answers.map(answer =>
    <AnswerCard key={answer.text} props={{ text: answer.text }} />
  )

  return (
    <div className="quiz-view">
      { loading && loader }
      { data && (
        <Fragment>
          <div className="sup">
            <span className="current">{`Question #${answers.length + 1}`}</span>
            <span className="countdown">{countdown}</span>
          </div>

          <QuestionCard props={currentQuestion} />

          <div className="answers">
            {answerCards}
          </div>
        </Fragment>
      )}
    </div>
  )
}

export default QuizView