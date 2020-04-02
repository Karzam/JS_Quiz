import React from 'react'
import { GridSpinner } from 'react-spinners-kit'
import { useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '../../../stores/actions'
import { loader } from 'graphql.macro'
import Auth from '../../../utils/auth'
import './style.scss'

const AUTHORIZE = loader('./authorize.gql')

const RedirectView = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [authorize, { called }] = useMutation(AUTHORIZE)

  const mutate = async () => {
    const url = new URL(window.location.href)
    const code = url.searchParams.get('code')

    const res = await authorize({
      variables: {
        code,
      }
    })

    if (res.data) {
      Auth.set(res.data.authorize.token)

      dispatch(setUser(res.data.authorize.user))

      return history.replace('/')
    }
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