import React from 'react'
import { GridSpinner } from 'react-spinners-kit'
import { useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'
import { loader } from 'graphql.macro'
import Auth from '../../../utils/auth'
import './style.scss'

const AUTHORIZE = loader('./authorize.gql')

const RedirectView = () => {
  const history = useHistory()
  const [authorize, { called }] = useMutation(AUTHORIZE)

  const mutate = async () => {
    const url = new URL(window.location.href)
    const code = url.searchParams.get('code')

    const res = await authorize({
      variables: {
        code,
      }
    })

    Auth.set(res.data.authorize.token)

    return history.replace('/')
  }

  if (!called) {
    mutate()
  }

  return (
    <div className="redirect-view">
      <span>{ 'Logging in...' }</span>

      <GridSpinner size={60} color="white" loading={true} />
    </div>
  )
}

export default RedirectView