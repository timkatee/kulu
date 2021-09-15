let GraphQLDb = require("../../../components/commons/GraphQLDb")
let graphQlDb = new GraphQLDb('Users')

module.exports = {
    createUser : async(parent, args, context, info) => {
        //
        graphQlDb.recordPayload = args.user
        //
        return await graphQlDb.mutation("CREATE")
    },
    updateUser : async(parent, args, context, info) => {
        //
        graphQlDb.recordPayload = args.user
        //
        return await graphQlDb.mutation("UPDATE")
    },
    // Users : async(parent, args, context, info) => {
    //     return await graphQlDb.query(parent, args, context, info,'all')
    // }
}