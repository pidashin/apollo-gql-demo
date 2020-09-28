const { gql } = require('apollo-server-express')

const typeDefs = gql`
  interface Node {
    id: ID!
  }

  type Launch implements Node{
    id: ID!
    site: String
    mission: Mission
    rocket: Rocket
    isBooked: Boolean!
  }

  type Rocket {
    id: ID!
    name: String
    type: String
  }

  type User {
    id: ID!
    email: String!
    trips: [Launch]!
  }

  type Mission {
    name: String
    missionPatch(size: PatchSize): String
  }

  enum PatchSize {
    SMALL
    LARGE
  }

  type Query {
    """
    launches(
      pageSize: Int
      after: String
    ): LaunchConnection!
    """
    launches: LaunchPlan
    launch(id: ID!): Launch
    me: User
    trips: [Trip!]!
    node(id: ID!): Node
  }

  type Mutation {
    bookTrips(launchIds: [ID]!): TripUpdateResponse!
    cancelTrip(launchId: ID!): TripUpdateResponse!
    login(email: String): String
  }

  type TripUpdateResponse {
    success: Boolean!
    message: String
    launches: [Launch]
  }

  """
  type LaunchConnection {
    cursor: String!
    hasMore: Boolean!
    launches: [Launch]!
  }
  """

  type LaunchConnection {
    edges: [LaunchEdge]
    pageInfo: PageInfo!
  }

  type LaunchEdge {
    cursor: String!
    node: Launch
  }

  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
  }

  type LaunchPlan implements Node {
    id: ID!
    launches(first: Int, after: String): LaunchConnection
  }

  type Trip {
    id: ID!
    launchId: ID!

    user: User!
  }
`

module.exports = typeDefs