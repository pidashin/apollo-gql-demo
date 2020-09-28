const {fromGlobalId} = require('../utils')

const __resolveType = (obj) => {
  const { type } = fromGlobalId(obj.id)

  return type
}

module.exports = {
  __resolveType
}