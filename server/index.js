const express = require('express')
const next = require('next')
const apolloServer = require('./apollo-gql/index')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  apolloServer.applyMiddleware({ app: server })

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
    console.log(
      `🚀 GQL Server ready at http://localhost:${port}/graphql`
    )
  })
})
