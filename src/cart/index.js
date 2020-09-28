import React, { Fragment } from 'react'
import { gql, useQuery } from '@apollo/client'

import Header from '../components/header'
import PageContainer from '../components/page-container'
import Loading from '../components/loading'
import BookTrips from '../containers/book-trip'
import CartItem from '../containers/cart-item'

export const GET_CART_ITEMS = gql`
  query GetCartItems {
    cartItems @client
  }
`
const Cart = () => {
  const { data, loading, error } = useQuery(GET_CART_ITEMS)

  if (loading) return <Loading />
  if (error) return <p>ERROR: {error.message}</p>

  return (
    <PageContainer>
      <Header>My Cart</Header>
      {data?.cartItems.length === 0 ? (
        <p data-testid='empty-message'>No items in your cart</p>
      ) : (
        <Fragment>
          {data?.cartItems.map(launchId => (
            <CartItem key={launchId} launchId={launchId} />
          ))}
          <BookTrips cartItems={data?.cartItems || []} />
        </Fragment>
      )}
    </PageContainer>
  )
}

export default Cart
