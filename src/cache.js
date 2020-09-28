import { InMemoryCache } from '@apollo/client'
import { AUTH_TOKEN } from '../src/constants'

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn() {
          return isLoggedInVar()
        },
        cartItems() {
          return cartItemsVar()
        },
      }
    }
  }
})

export const isLoggedInVar = cache.makeVar(typeof window === 'undefined' ? false : !!localStorage.getItem(AUTH_TOKEN))
export const cartItemsVar = cache.makeVar([])