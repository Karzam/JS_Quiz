import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import './style.scss'

const HomeView = () => {
  const authLink = `https://github.com/login/oauth/authorize?client_id=305c5560839e1ccd8a95&scope=user`

  return (
    <div className="home-view">
      <div className="wrapper">
        <button className="button" onClick={ () => window.location = authLink }>
          <FontAwesomeIcon className="icon" icon={ faGithub } />
          { 'Sign in with GitHub' }
        </button>
      </div>
    </div>
  )
}

export default HomeView