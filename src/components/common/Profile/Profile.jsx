import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'
import { clearUser } from '../../../stores/actions'
import { GITHUB_AUTH } from '../../../utils/urls'
import Auth from '../../../utils/auth'
import './style.scss'

const Profile = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const history = useHistory()

  const { avatar, name } = user || {}

  const [unwrapped, setUnwrapped] = useState(false)
  const [unwrapAnimation, setUnwrapAnimation] = useState('')

  const onAvatarClick = () => {
    if (!unwrapped) {
      setUnwrapAnimation('unwrap')
    }

    setUnwrapped(!unwrapped)
  }

  const onSignInClick = () => {
    window.location = GITHUB_AUTH
  }

  const onSignOutClick = () => {
    Auth.clear()
    dispatch(clearUser())
    setUnwrapped(false)

    history.replace('/')
  }

  return (
    <div className="profile">
      <button className="avatar" onClick={ onAvatarClick }>
        { avatar
          ? <img alt="profile" className="image" src={ avatar } />
          :
          <div className="placeholder">
            <FontAwesomeIcon className="icon" icon={ faUser } />
          </div>
        }
      </button>

      { unwrapped &&
        <div className={`menu ${unwrapAnimation}`} onAnimationEnd={() => setUnwrapAnimation('')}>
          { name && <span className="name">{ name }</span> }

          <button className="sign" onClick={ user ? onSignOutClick : onSignInClick }>
            <FontAwesomeIcon icon={ user ? faSignOutAlt : faSignInAlt } />
            <span>{ user ? 'Sign out' : 'Sign in' }</span>
          </button>
        </div>
      }
    </div>
  )
}

export default Profile