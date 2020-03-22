import React from 'react'
import './index.scss'

const AnswerCard = ({ props }) => {
  const { id, text, onClick } = props

  return (
    <button className="answer-card" onClick={() => onClick(id)}>
      <span className="text">{text}</span>
    </button>
  )
}

export default AnswerCard