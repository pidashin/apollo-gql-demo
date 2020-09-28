const { getUserId, toGlobalId, fromGlobalId } = require('../utils')

const getLaunchPlan = async ({ dataSources }) => {
  const allLaunches = await dataSources.launchAPI.getAllLaunches()
  allLaunches.reverse()

  return { id: toGlobalId('LaunchPlan', '1'), launches: allLaunches }
}

const launches = (_, __, context) => {
  return getLaunchPlan(context)
}

const launch = async (_, { id }, { dataSources }) => {
  const launch = await dataSources.launchAPI.getLaunchById({ launchId: id })
  return launch
}

const me = async (_, __, context) => {
  let userId
  try {
    userId = getUserId(context)
  }
  catch (e) {
    console.log('Not login yet!')
  }

  if (!userId) {
    return null
  }

  const { prisma } = context
  const user = await prisma.user.findOne({
    where: {
      id: userId
    }
  })

  return user
}

const trips = async (_, __, context) => {
  const result = await context.prisma.trip.findMany()

  return result
}

const node = (root, { id: globalId }, context) => {
  const { type } = fromGlobalId(globalId)

  if (type === 'Launch') {
    const { dataSources } = context
    return dataSources.launchAPI.getLaunchById({launchId: globalId})
  }
  else if (type === 'LaunchPlan') {
    return getLaunchPlan(context)
  }

  return null
}

module.exports = {
  launches,
  launch,
  me,
  trips,
  node,
}