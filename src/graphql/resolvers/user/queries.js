let GraphQLDb = require("../../../components/commons/GraphQLDb")
let graphQlDb = new GraphQLDb('Users')

module.exports = {
    User : async(parent, args, context, info) => {
        return await graphQlDb.query(parent, args, context, info,'single')
    },
    // Users : async(parent, args, context, info) => {
    //     return await graphQlDb.query(parent, args, context, info,'all')
    // }
}