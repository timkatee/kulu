let GraphQLDb = require("./GraphQLDb")
let Utilities = require("./Utilities")
//
const NodeMetaDataDb = async (parent, args, context, info) => {
    let graphQlDb = new GraphQLDb(args.nodeName)
    return {
        data_count: await graphQlDb.modelInstance().count(),
        data_filtered_count: await graphQlDb.modelInstance().count(Utilities.unquoteJsonObjectProperties(args.seqQueryOptions))
    }
}

module.exports = {NodeMetaDataDb: NodeMetaDataDb}
