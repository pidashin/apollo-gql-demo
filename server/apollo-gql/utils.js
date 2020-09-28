const jwt = require('jsonwebtoken')
const { APP_SECRET } = require('./constants')

function getUserId(context) {
  const Authorization = context.req.headers.authorization
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const { userId } = jwt.verify(token, APP_SECRET)
    return userId
  }

  throw new Error('Not authenticated')
}

function paginateResults({
  after: cursor,
  pageSize = 20,
  results,
  getCursor = () => null,
}) {
  if (pageSize < 1) return [];

  if (!cursor) return results.slice(0, pageSize);
  const cursorIndex = results.findIndex(item => {
    // if an item has a `cursor` on it, use that, otherwise try to generate one
    let itemCursor = item.cursor ? item.cursor : getCursor(item);

    // if there's still not a cursor, return false by default
    return itemCursor ? cursor === itemCursor : false;
  });

  return cursorIndex >= 0
    ? cursorIndex === results.length - 1 // don't let us overflow
      ? []
      : results.slice(
        cursorIndex + 1,
        Math.min(results.length, cursorIndex + 1 + pageSize),
      )
    : results.slice(0, pageSize);
}

const applyCursorsToEdges = (allEdges, before, after) => {
  let edges = allEdges

  if (after) {
    let afterEdgeIdx = edges.findIndex(edge => edge.cursor === after)
    if (afterEdgeIdx !== -1) {
      edges = edges.slice(afterEdgeIdx + 1)
    }
  }

  if (before) {
    let beforeEdgeIdx = edges.findIndex(edge => edge.cursor === before)
    if (beforeEdgeIdx !== -1) {
      edges = edges.slice(0, beforeEdgeIdx)
    }
  }

  return edges
}

const relayPagination = (allEdges, { before, after, first, last }) => {
  let edges = applyCursorsToEdges(allEdges, before, after)
  let hasPreviousPage = false
  let hasNextPage = false

  if (first !== undefined) {
    hasNextPage = edges.length > first

    if (first < 0) {
      throw new Error("First must not less than 0")
    }
    else if (edges.length > first) {
      edges = edges.slice(0, first)
    }
  }

  if (last !== undefined) {
    hasPreviousPage = edges.length > last

    if (last < 0) {
      throw new Error("Last must not less than 0")
    }
    else if (edges.length > last) {
      edges = edges.slice(edges.lenghth - last)
    }
  }

  const startCursor = edges[0] ? edges[0].cursor : ''
  const endCursor = edges[edges.length - 1] ? edges[edges.length - 1].cursor : ''

  return {
    edges,
    pageInfo: {
      hasPreviousPage,
      hasNextPage,
      startCursor,
      endCursor,
    }
  }
}

const globalIdDivider = ':'

const toGlobalId = (type, id) => {
  const buff = Buffer.from(`${type}${globalIdDivider}${id}`)
  return buff.toString('base64')
}

const fromGlobalId = (globalId) => {
  const buff = Buffer.from(globalId, 'base64')
  const [type, id] = buff.toString('utf-8').split(globalIdDivider)

  return { type, id }
}

module.exports = {
  getUserId,
  paginateResults,
  relayPagination,
  toGlobalId,
  fromGlobalId
}