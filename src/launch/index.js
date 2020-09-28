import React, { Fragment } from 'react'
import { useQuery, gql } from '@apollo/client'
import { LAUNCH_TILE_DATA } from '../launches/index'
import { useRouter } from 'next/router'

import PageContainer from '../components/page-container'
import Loading from '../components/loading'
import Header from '../components/header'
import LaunchDetail from '../components/launch-detail'
import ActionButton from '../containers/action-button'

export const GET_LAUNCH_DETAILS = gql`
  query LaunchDetails($launchId: ID!) {
    launch(id: $launchId) {
      site
      rocket {
        type
      }
      ...LaunchTile
    }
  }
  ${LAUNCH_TILE_DATA}
`

const Launch = () => {
  const router = useRouter()
  const { launchId } = router.query

  const { data, loading, error } = useQuery(GET_LAUNCH_DETAILS, {
    variables: { launchId },
  })

  if (loading) {
    return <Loading />
  }
  if (error) {
    return <p>ERROR: {error.message}</p>
  }
  if (!data) {
    return <p>Not found</p>
  }

  return (
    <PageContainer>
      <Header
        image={
          data.launch && data.launch.mission && data.launch.mission.missionPatch
        }
      >
        {data && data.launch && data.launch.mission && data.launch.mission.name}
      </Header>
      <LaunchDetail {...data.launch} />
      <ActionButton {...data.launch} />
    </PageContainer>
  )
}

export default Launch
