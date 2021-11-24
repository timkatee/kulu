let GraphQLDb = require("../../../components/commons/GraphQLDb")

module.exports = {
    User : async(parent, args, context, info) => {
        let graphQlDb = new GraphQLDb('Users')
        return await graphQlDb.query(parent, args, context, info,'single')
    },
    Users : async(parent, args, context, info) => {
        let graphQlDb = new GraphQLDb('Users')
        return await graphQlDb.query(parent, args, context, info,'all')
    }
}