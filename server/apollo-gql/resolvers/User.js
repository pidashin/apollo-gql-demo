const trips = async (user, _, { prisma, dataSources }) => {
  const trips = await prisma.user.findOne({
    where: { id: user.id }
  }).trips()

  return trips.length > 0 ? dataSources.launchAPI.getLaunchesByIds({ launchIds: trips.map(trip => trip.launchId) }) : []
}

module.exports = {
  trips
}