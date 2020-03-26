import React from 'react'
import { Link } from 'react-router-dom'
import './style.scss'

const HomeView = () => {
  const levels = [{
    path: 'beginner',
    icon: '👶',
    label: 'Beginner',
    description: 'If you started learning Javascript and want to train'
  },
  {
    path: 'intermediate',
    icon: '💯',
    label: 'Intermediate',
    description: 'For people pretty confortable with Javascript'
  },
  {
    path: 'advanced',
    icon: '🔥',
    label: 'Advanced',
    description: 'Javascript has no secret for you, come here!'
  }]

  const buttons = levels.map(l =>
    <Link key={ l.label } className="level" to={{ pathname: `quiz/${l.path}`, level: l.path }}>
      <span className="icon" role="img" aria-label="emoji">{ l.icon }</span>
      <span className="label">{ l.label }</span>
      <p className="description">{ l.description }</p>
    </Link>
  )
  
  return (
    <div className="home-view">
      <div className="wrapper">
        <span className="title">{ 'Select a difficulty level:' }</span>

        <div className="buttons">
          { buttons }
        </div>
      </div>
    </div>
  )
}

export default HomeView