const { getUserId } = require('../utils')

const isBooked = async (launch, _, context) => {
  let userId
  try {
    userId = getUserId(context)
  }
  catch (e) {

  }

  if (!userId) {
    return false
  }

  const { prisma } = context
  const trip = await prisma.trip.findOne({
    where: {
      launchId_userId: {
        launchId: launch.id,
        userId
      }
    }
  })

  return !!trip
}

module.exports = {
  isBooked
}