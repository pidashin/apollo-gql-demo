// import '../styles/globals.css'
import {
  ApolloClient,
  createHttpLink,
  ApolloProvider,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { typeDefs, resolvers } from '../src/resolvers'
import { cache } from '../src/cache'
import { AUTH_TOKEN } from '../src/constants'

import '../src/global.scss'

const isServer = typeof localStorage === 'undefined'

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql'
})

const authLink = setContext((_, { headers }) => {
  const token = isServer ? null : localStorage.getItem(AUTH_TOKEN)

  return {
    headers: {
      ...headers,
      authorization: token
    }
  }
})

const client = new ApolloClient({
  typeDefs,
  resolvers,
  link: authLink.concat(httpLink),
  cache
})

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
