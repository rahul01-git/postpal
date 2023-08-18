"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_resolver_1 = require("./resolvers/user.resolver");
const user_typeDef_1 = require("./schema/user.typeDef");
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const config_1 = require("./config");
const initApp = async () => {
    await config_1.sequelize.authenticate();
    console.log("Connection established successfully");
    const server = new server_1.ApolloServer({
        typeDefs: user_typeDef_1.userTypeDefs,
        resolvers: user_resolver_1.userResolver
    });
    const { url } = await (0, standalone_1.startStandaloneServer)(server, {
        listen: { port: 4000 },
        context: async ({ req }) => ({ req })
    });
    console.log(`Server running in port ${url}`);
};
initApp();
