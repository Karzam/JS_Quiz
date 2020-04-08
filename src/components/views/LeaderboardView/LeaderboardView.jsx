import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import { GridSpinner } from 'react-spinners-kit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faCrown } from '@fortawesome/free-solid-svg-icons'
import { loader } from 'graphql.macro'
import './style.scss'

const QUERY = loader('./query.gql')

const LeaderboardView = () => {
  const { data, loading } = useQuery(QUERY)

  if (loading) {
    return (
      <div className="loader">
        <GridSpinner size={60} color="white" loading={true} />
      </div>
    )
  }

  const iconClass = ['gold', 'silver', 'bronze']

  const userCards = data.leaderboard.users.map((user, index) =>
    <div key={ index } className="item">
      { iconClass[index] && <FontAwesomeIcon className={ `icon ${iconClass[index]}` } icon={ faCrown } /> }

      <span className="rank">{ `#${index + 1}` }</span>

      <img className="avatar" alt="avatar" src={ user.avatar } />
      <span className="name">{ user.name }</span>
    </div>
  )

  return (
    <div className="leaderboard-view">
      <div className="sup">
        <div className="label">
          <FontAwesomeIcon icon={ faCrown } />
          {`Leaderboard`}
        </div>

        <Link className="link" to={{ pathname: '/' }}>
          <FontAwesomeIcon icon={ faHome } />
          { 'Home' }
        </Link>
      </div>

      <div className="leaderboard">
        { userCards }
      </div>
    </div>
  )
}

export default LeaderboardView