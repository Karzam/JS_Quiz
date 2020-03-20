import React from 'react'
import './index.scss'

const AnswerCard = ({ props }) => {
  const { text } = props

  return (
    <div className="answer-card">
      <span className="text">{text}</span>
    </div>
  )
}

export default AnswerCard