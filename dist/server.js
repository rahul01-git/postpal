"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const merge_1 = require("@graphql-tools/merge");
const resolvers_1 = require("./resolvers");
const schema_1 = require("./schema");
const config_1 = require("./config");
const helpers_1 = require("./helpers");
const initApp = async () => {
    const mergedTypeDefs = (0, merge_1.mergeTypeDefs)([
        schema_1.userTypeDefs,
        schema_1.postTypeDefs,
        schema_1.likeTypeDefs,
        schema_1.commentTypeDefs,
    ]);
    const mergedResolvers = (0, merge_1.mergeResolvers)([
        resolvers_1.userResolver,
        resolvers_1.postResolver,
        resolvers_1.likeResolver,
        resolvers_1.commentResolver
    ]);
    await config_1.sequelize.authenticate();
    console.log('Connection has been established successfully.');
    const server = new server_1.ApolloServer({
        typeDefs: mergedTypeDefs,
        resolvers: mergedResolvers,
    });
    const { url } = await (0, standalone_1.startStandaloneServer)(server, {
        listen: { port: 4000 },
        context: helpers_1.Context
    });
    console.log(`Server running: ${url}`);
};
initApp();
