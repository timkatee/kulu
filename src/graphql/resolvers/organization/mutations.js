let GraphQLDb = require("../../../components/commons/GraphQLDb")
let graphQlDb = new GraphQLDb('Organizations')

module.exports = {
    createOrganization : async(parent, args, context, info) => {
        //
        graphQlDb.recordPayload = args.organization
        //
        return await graphQlDb.mutation("CREATE")
    },
    updateOrganization : async(parent, args, context, info) => {
        //
        graphQlDb.recordPayload = args.organization
        //
        return await graphQlDb.mutation("UPDATE")
    },
    // Users : async(parent, args, context, info) => {
    //     return await graphQlDb.query(parent, args, context, info,'all')
    // }
}