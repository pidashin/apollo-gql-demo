const jwt = require('jsonwebtoken')
const { APP_SECRET } = require('../constants')
const { getUserId } = require('../utils')

const bookTrips = (_, { launchIds }, context) => {
  const userId = getUserId(context)
  const { prisma, dataSources } = context

  let launches = []
  launchIds.forEach(async launchId => {
    let trip = await prisma.trip.findOne({
      where: {
        launchId_userId: {
          launchId: +launchId,
          userId
        }
      }
    })

    if (!trip) {
      trip = await prisma.trip.create({
        data: {
          launchId: +launchId,
          user: { connect: { id: userId } }
        }
      })
    }

    const launch = await dataSources.launchAPI.getLaunchById({ launchId })
    launches.push(launch)
  })

  return {
    success: true,
    message: '',
    launches
  }
}

const cancelTrip = async (_, { launchId }, context) => {
  const userId = getUserId(context)
  const { prisma, dataSources } = context

  const trip = await prisma.trip.delete({
    where: {
      launchId_userId: {
        launchId: +launchId,
        userId,
      }
    }
  })

  let launch = trip ? await dataSources.launchAPI.getLaunchById({ launchId }) : null

  return {
    success: !!trip,
    message: !!trip ? '' : `failed to delete trip, launchId: ${launchId}, userId: ${userId}`,
    launches: !!launch ? [launch] : null
  }
}

const login = async (_, { email }, { prisma }) => {
  let user = await prisma.user.findOne({ where: { email } })

  if (!user) {
    user = await prisma.user.create({
      data: { email }
    })
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return token
}

module.exports = {
  bookTrips,
  cancelTrip,
  login
}