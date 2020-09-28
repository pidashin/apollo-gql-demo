import React from 'react'
import { gql, useMutation } from '@apollo/client'

import Button from '../components/button'
import { cartItemsVar } from '../cache'
import { GET_LAUNCH } from './cart-item'

export const BOOK_TRIPS = gql`
  mutation BookTrips($launchIds: [ID]!) {
    bookTrips(launchIds: $launchIds) {
      success
      message
      launches {
        id
        isBooked
      }
    }
  }
`

const BookTrips = ({ cartItems }) => {
  const [bookTrips, { data }] = useMutation(BOOK_TRIPS, {
    variables: { launchIds: cartItems },
    refetchQueries: cartItems.map(launchId => {
      return {
        query: GET_LAUNCH,
        variables: { launchId },
      }
    }),
    onCompleted: () => {
      cartItemsVar([])
    },
  })

  return data && data.bookTrips && !data.bookTrips.success ? (
    <p data-testid='message'>{data.bookTrips.message}</p>
  ) : (
    <Button
      onClick={async () => {
        await bookTrips()
      }}
    >
      Book All
    </Button>
  )
}

export default BookTrips
