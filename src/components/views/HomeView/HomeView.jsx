import React from 'react'
import { useHistory } from 'react-router-dom'
import Auth from '../../../utils/auth'
import { GITHUB_AUTH } from '../../../utils/urls'
import './style.scss'

const HomeView = () => {
  const history = useHistory()

  // Redirect to github auth if not signed in
  const onQuizClick = () => {
    if (!Auth.get()) {
      return window.location = GITHUB_AUTH
    }

    return history.push('/quiz')
  }

  const onResultsClick = () => {
    if (!Auth.get()) {
      return window.location = GITHUB_AUTH
    }

    return history.push('/results')
  }

  return (
    <div className="home-view">
      <div className="wrapper">
        <span className="title">{ 'Welcome!' }</span>

        <div className="buttons">
          <button className="button" onClick={ onQuizClick }>
            <span className="icon" role="img" aria-label="emoji">{ '❓' }</span>
            <span className="label">{ 'Quiz' }</span>
            <p className="description">{ 'Train with a new javascript quiz!' }</p>
          </button>

          <button className="button" onClick={ onResultsClick }>
            <span className="icon" role="img" aria-label="emoji">{ '📝' }</span>
            <span className="label">{ 'Results' }</span>
            <p className="description">{ 'See all your previous results' }</p>
          </button>

          <button className="button" onClick={ () => console.log('leaderboard') }>
            <span className="icon" role="img" aria-label="emoji">{ '🏆' }</span>
            <span className="label">{ 'Leaderboard' }</span>
            <p className="description">{ 'The best of the best players!' }</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default HomeView