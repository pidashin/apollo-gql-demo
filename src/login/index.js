import React from 'react'
import { useApolloClient, useMutation, gql } from '@apollo/client'
import { AUTH_TOKEN } from '../constants'
import { isLoggedInVar } from '../cache'

import Loading from '../components/loading'
import LoginForm from '../components/login-form'

const LOGIN_USER = gql`
  mutation login($email: String!) {
    login(email: $email)
  }
`

const Login = () => {
  // const client = useApolloClient()

  const [login, { loading, error }] = useMutation(LOGIN_USER, {
    onCompleted({ login }) {
      localStorage.setItem(AUTH_TOKEN, login)
      // client.writeData({ data: { isLoggedIn: true } })
      isLoggedInVar(true)
    }
  })

  if (loading) {
    return <Loading />
  }
  if (error) {
    return <p>An error occurred</p>
  }

  return <LoginForm login={login} />
}

export default Login
