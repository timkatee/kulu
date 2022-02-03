let GraphQLDb = require("../../../components/commons/GraphQLDb")
let graphQlDb = new GraphQLDb('Users')

module.exports = {
    createEditUser: async (parent, args, context, info) => {
        //
        graphQlDb.recordPayload = args.user
        //
        return await graphQlDb.mutation(args.type)
    }
}