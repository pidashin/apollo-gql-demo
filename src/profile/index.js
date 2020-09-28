import React from 'react'
import { gql, useQuery } from '@apollo/client'

import PageContainer from '../components/page-container'
import Loading from '../components/loading'
import Header from '../components/header'
import LaunchTile from '../components/launch-tile'
import { LAUNCH_TILE_DATA } from '../launches/index'

export const GET_MY_TRIPS = gql`
  query GetMyTrips {
    me {
      id
      email
      trips {
        ...LaunchTile
      }
    }
  }
  ${LAUNCH_TILE_DATA}
`

const Profile = () => {
  const { data, loading, error } = useQuery(GET_MY_TRIPS, {
    fetchPolicy: 'network-only',
  })

  if (loading) return <Loading />
  if (error) return <p>ERROR: {error.message}</p>
  if (data === undefined) return <p>ERROR</p>

  return (
    <PageContainer>
      <Header>My Trips</Header>
      {data.me && data.me.trips.length ? (
        data.me.trips.map(launch => (
          <LaunchTile key={launch.id} launch={launch} />
        ))
      ) : (
        <p>You haven't booked any trips</p>
      )}
    </PageContainer>
  )
}

export default Profile
