import React from 'react'
import { CodeBlock } from 'react-code-blocks'
import monokaiSublime from 'react-code-blocks/build/cjs/themes/monokai-sublime'
import './index.scss'

const QuestionCard = ({ props }) => {
  const { title, code } = props

  return (
    <div className="question-card">
      <p className="title">{title}</p>

      <CodeBlock text={code} language="javascript" theme={monokaiSublime} />
    </div>
  )
}

export default QuestionCard
