import React, { Fragment } from 'react'
import { CodeBlock } from 'react-code-blocks'
import monokaiSublime from 'react-code-blocks/build/cjs/themes/monokai-sublime'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import './style.scss'

const ResultCard = ({ props }) => {
  const { index, question, answer, correctAnswer } = props
  const isCorrect = answer && answer.id === correctAnswer.id

  const titleClass = isCorrect ? 'title right' : 'title wrong'
  const answerClass = isCorrect ? 'answer right' : 'answer wrong'
  const icon = isCorrect ? faCheckCircle : faTimesCircle

  return (
    <Fragment>
      <span className="number">{`Question #${index}`}</span>

      <div className="result-card">
        <div className={ titleClass }>
          <FontAwesomeIcon className="icon" icon={ icon } />
          <span>{ question.title }</span>
        </div>

        <CodeBlock text={ question.code } language="javascript" theme={ monokaiSublime } />

        <div className="answers">
          { answer &&
            <div className={ answerClass }>
              <FontAwesomeIcon className="icon" icon={ icon } />
              <span>{ answer.text }</span>
            </div>
          }

          { !isCorrect &&
            <div className="correctAnswer">
              <FontAwesomeIcon className="icon" icon={ faCheckCircle } />
              <span>{ correctAnswer.text }</span>
            </div>
          }
        </div>
      </div>
    </Fragment>
  )
}

export default ResultCard