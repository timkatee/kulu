let GraphQLDb = require("../../../components/commons/GraphQLDb")
let graphQlDb = new GraphQLDb('Users')

module.exports = {
    Organization : async(parent, args, context, info) => {
        return await graphQlDb.query(parent, args, context, info,'single')
    },
    Organizations : async(parent, args, context, info) => {
        return await graphQlDb.query(parent, args, context, info,'all')
    }
}