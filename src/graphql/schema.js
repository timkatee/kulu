const { join } = require('path');
const { mergeResolvers,mergeTypeDefs } = require('@graphql-tools/merge');
const { buildSubgraphSchema } = require('@apollo/subgraph');
const { loadFilesSync } = require("@graphql-tools/load-files");
//

const typeDefs = loadFilesSync(join(__dirname, './typedefs'));
const resolvers = loadFilesSync(join(__dirname, './resolvers'));

const schema = buildSubgraphSchema({
    typeDefs: typeDefs,
    resolvers: mergeResolvers(resolvers)
});



module.exports = schema;