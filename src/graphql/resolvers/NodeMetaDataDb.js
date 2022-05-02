let GraphQLDb = require("../../components/commons/GraphQLDb")
let Utilities = require("../../components/commons/Utilities")
//
module.exports = {
    Query: {
        NodeMetaDataDb: async (parent, args, context, info) => {
            let graphQlDb = new GraphQLDb(args.nodeName)
            return {
                data_count: await graphQlDb.modelInstance().count(),
                data_filtered_count: await graphQlDb.modelInstance().count(Utilities.unquoteJsonObjectProperties(args.seqQueryOptions))
            }
        }
    }
}
