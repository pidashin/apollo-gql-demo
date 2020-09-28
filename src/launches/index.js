import React from 'react'
import { useQuery, gql } from '@apollo/client'
import LaunchTile from '../components/launch-tile'
import Header from '../components/header'
import Button from '../components/button'
import Loading from '../components/loading'
import PageContainer from '../components/page-container'

export const LAUNCH_TILE_DATA = gql`
  fragment LaunchTile on Launch {
    id
    isBooked
    rocket {
      id
      name
    }
    mission {
      name
      missionPatch
    }
  }
`

const GET_LAUNCHES = gql`
  query Launches($after: String) {
    launches {
      launches(after: $after) {
        edges {
          cursor
          node {
            ...LaunchTile
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
  ${LAUNCH_TILE_DATA}
`

const Launches = () => {
  const { data, loading, error, fetchMore } = useQuery(GET_LAUNCHES)

  if (loading) {
    return <Loading />
  }
  if (error) {
    return <p>ERROR</p>
  }
  if (!data) {
    return <p>Not Found</p>
  }

  return (
    <PageContainer>
      <Header />
      {data.launches &&
        data.launches.launches &&
        data.launches.launches.edges &&
        data.launches.launches.edges.map(({ node: launch }) => (
          <LaunchTile key={launch.id} launch={launch} />
        ))}
      {data.launches &&
        data.launches.launches &&
        data.launches.launches.pageInfo &&
        data.launches.launches.pageInfo.hasNextPage && (
          <Button
            onClick={() =>
              fetchMore({
                variables: {
                  after: data.launches.launches.pageInfo.endCursor
                },
                updateQuery: (prev, { fetchMoreResult, ...rest }) => {
                  if (!fetchMoreResult) {
                    return prev
                  }

                  return {
                    ...fetchMoreResult,
                    launches: {
                      ...fetchMoreResult.launches,
                      launches: {
                        ...fetchMoreResult.launches.launches,
                        edges: [
                          ...prev.launches.launches.edges,
                          ...fetchMoreResult.launches.launches.edges
                        ]
                      }
                    }
                  }
                }
              })
            }
          >
            Load More
          </Button>
        )}
    </PageContainer>
  )
}

export default Launches
