import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import './style.scss'

const Profile = ({ user }) => {
  const { avatar, name } = user || {}

  const [unwrapped, setUnwrapped] = useState(false)
  const [unwrapAnimation, setUnwrapAnimation] = useState('')

  const onAvatarClick = () => {
    if (!unwrapped) {
      setUnwrapAnimation('unwrap')
    }

    setUnwrapped(!unwrapped)
  }

  return (
    <div className="profile">
      <button className="avatar" onClick={onAvatarClick}>
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

          <button className="sign">
            <FontAwesomeIcon icon={ user ? faSignOutAlt : faSignInAlt } />
            <span>{ user ? 'Sign out' : 'Sign in' }</span>
          </button>
        </div>
      }
    </div>
  )
}

export default Profile