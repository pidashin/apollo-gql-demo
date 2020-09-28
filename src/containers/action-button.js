import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client'

import { GET_LAUNCH_DETAILS } from '../launch/index'
import Button from '../components/button'
import { cartItemsVar } from '../cache'

export { GET_LAUNCH_DETAILS };

export const CANCEL_TRIP = gql`
  mutation cancel($launchId: ID!) {
    cancelTrip(launchId: $launchId) {
      success
      message
      launches {
        id
        isBooked
      }
    }
  }
`

export const TOGGLE_CART = gql`
  mutation addOrRemoveFromCart($launchId: ID!) {
    addOrRemoveFromCart(id: $launchId) @client
  }
`

const CancelTripButton = ({ id }) => {
  const [mutate, { loading, error }] = useMutation(CANCEL_TRIP, {
    variables: { launchId: id },
    update(cache, { data: { cancelTrip } }) {
      const launch = cancelTrip.launches[0]
      cache.modify({
        id: `User:${localStorage.getItem('userId')}`,
        fields: {
          trips(existingTrips) {
            const launchRef = cache.writeFragment({
              data: launch,
              fragment: gql`
                fragment RemoveLaunch on Launch {
                  id
                }
              `,
            })
            return existingTrips.filter(tripRef => tripRef === launchRef)
          },
        },
      })
    },
  })

  if (loading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>An error occurred</p>
  }

  return (
    <div>
      <Button onClick={() => mutate()} data-testid={'action-button'}>
        Cancel This Trip
      </Button>
    </div>
  )
}

const ToggleTripButton = ({ id }) => {
  const cartItems = cartItemsVar()
  const isInCart = id ? cartItems.includes(id) : false
  const [, toggleTrip] = useState(isInCart)

  return (
    <div>
      <Button
        onClick={() => {
          if (id) {
            cartItemsVar(
              isInCart ? cartItems.filter(i => i !== id) : [...cartItems, id]
            )
            // Trigger a re-render to pick up the `cartItemsVar` changes.
            toggleTrip(!isInCart)
          }
        }}
        data-testid={'action-button'}
      >
        {isInCart ? 'Remove from Cart' : 'Add to Cart'}
      </Button>
    </div>
  )
}

const ActionButton = ({ isBooked, id }) => {
  return isBooked ? <CancelTripButton id={id} /> : <ToggleTripButton id={id} />
}

export default ActionButton
