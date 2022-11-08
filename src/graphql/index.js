const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const schema = require('./schema');

const apolloServer = new ApolloServer({
    schema,
    context: ({ req }) => ({
        req:req
    }),
    // plugins: [
    //     ApolloServerPluginLandingPageGraphQLPlayground({
    //         // options
    //     })
    // ],
    playground: true,
    introspection: process.env.APPLICATION_ENV !== "production"
});

module.exports = apolloServer