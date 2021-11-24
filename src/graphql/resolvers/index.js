// users
let userQueries = require('./user/queries')
let userMutations = require('./user/mutations')
// node meta data db
let nodeMetaDataDbQueries = require('./../../components/commons/NodeMetaDataDb')

const resolvers = {
    Query: {
        ...userQueries,
        ...nodeMetaDataDbQueries
    },
    Mutation: {
        ...userMutations,
    }
}

module.exports = resolvers