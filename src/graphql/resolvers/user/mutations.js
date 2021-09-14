let GraphQLDb = require("../../../components/commons/GraphQLDb")
let graphQlDb = new GraphQLDb('Users')

module.exports = {
    createUser : async(parent, args, context, info) => {
        return await graphQlDb.mutation(parent, args, context, info)
    },
    // Users : async(parent, args, context, info) => {
    //     return await graphQlDb.query(parent, args, context, info,'all')
    // }
}