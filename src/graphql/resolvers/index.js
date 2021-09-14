let userQueries = require('./user/queries')
let userMutations = require('./user/mutations')

const resolvers = {
    Query: {
        ...userQueries,
        // ...userAccountQueries
    },
    // Mutation: {
    //     ...userMutations
    // }
    // ...userRoleFields
}

module.exports = resolvers