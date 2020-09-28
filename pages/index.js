import React from 'react'
import { useQuery, gql } from '@apollo/client'
import Home from '../src/launches/index'
import Login from '../src/login/index'


const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`

const Main = () => {
  const { data } = useQuery(IS_LOGGED_IN)

  return data.isLoggedIn ? <Home /> : <Login />
}

export default Main
