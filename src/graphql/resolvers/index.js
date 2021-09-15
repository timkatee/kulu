// users
let userQueries = require('./user/queries')
let userMutations = require('./user/mutations')
// organizations
let organizationQueries = require('./organization/queries')
let organizationMutations = require('./organization/mutations')

const resolvers = {
    Query: {
        ...userQueries,
        ...organizationQueries
    },
    Mutation: {
        ...userMutations,
        ...organizationMutations
    }
}

module.exports = resolvers