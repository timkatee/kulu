let GraphQLDb = require("../../../components/commons/GraphQLDb")

module.exports = {
    Query: {
        User: async (parent, args, context, info) => {
            let graphQlDb = new GraphQLDb('Users')
            return await graphQlDb.query(parent, args, context, info, 'single')
        },
        Users: async (parent, args, context, info) => {
            let graphQlDb = new GraphQLDb('Users')
            return await graphQlDb.query(parent, args, context, info, 'all')
        }
    },
    Mutation: {
        createEditUser: async (parent, args, context, info) => {
            //
            let graphQlDb = new GraphQLDb('Users')
            graphQlDb.recordPayload = args.user
            //
            return await graphQlDb.mutation(args.type)
        }
    }
}