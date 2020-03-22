import React, { Fragment, useState, useEffect } from 'react'
import QuestionCard from '../QuestionCard/QuestionCard'
import AnswerCard from '../AnswerCard/AnswerCard'
import './index.scss'

const QuizProvider = ({ props }) => {
  const { data, onNext, onEnd } = props

  const QUESTION_NB = 3
  const COUNTDOWN = 20

  const [answers, setAnswers] = useState([])
  const [countdown, setCountdown] = useState(COUNTDOWN)

  useEffect(() => {
    // If quiz has been completed, triggers redirection to results
    if (answers.length === QUESTION_NB) {
      onEnd()
    }

    // Set null answer if countdown is over, or update value
    const interval = setInterval(() => {
      if (countdown === 0) {
        onAnswer(null)
      }

      setCountdown(countdown => countdown - 1 )
    }, 1000)

    return () => clearInterval(interval)
  }, [answers, countdown])

  const onAnswer = (answerId) => {
    // Triggers parent view update
    onNext()

    setCountdown(COUNTDOWN)

    // Store question / answer ids
    const questionId = currentQuestion.id
    setAnswers([...answers, { questionId, answerId }])
  }

  const currentQuestion = data.questions[answers.length] || null

  if (!currentQuestion) {
    return null
  }

  const answerCards = currentQuestion.answers.map(answer =>
    <AnswerCard key={answer.text} props={{ id: answer.id, text: answer.text, onClick: onAnswer }} />
  )

  return (
    <Fragment>
      <div className="sup">
        <span>{`Question #${answers.length + 1}`}</span>
        <span className="countdown">{countdown}</span>
      </div>

      <QuestionCard props={currentQuestion} />

      <div className="answers">
        {answerCards}
      </div>
    </Fragment>
  )
}

export default QuizProvider