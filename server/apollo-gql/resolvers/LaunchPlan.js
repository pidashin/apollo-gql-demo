const { relayPagination } = require('../utils')

const launches = async (parent, { first = 20, after }) => {
  const transformedLaunches = parent.launches.map(item => {
    return {
      cursor: item.id,
      node: item
    }
  })

  return relayPagination(transformedLaunches, { first, after })
}

module.exports = {
  launches
}