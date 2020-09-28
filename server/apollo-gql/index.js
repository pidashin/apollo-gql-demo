const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./schema')
const LaunchAPI = require('./datasources/launch')
const resolvers = require('./resolvers')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const server = new ApolloServer({
  context: (context) => {
    return {
      ...context,
      prisma
    }
  },
  typeDefs,
  resolvers,
  dataSources: () => ({
    launchAPI: new LaunchAPI()
  })
})

// server.listen().then(({ url }) => {
//   console.log(`🚀 Server ready at ${url}`)
// })

module.exports = server