import { userResolver } from './resolvers/user.resolver';
import { userTypeDefs } from './schema/user.typeDef';
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { sequelize } from './config'

const initApp = async () => {
    await sequelize.authenticate()
    console.log("Connection established successfully");

    const server = new ApolloServer({
        typeDefs: userTypeDefs,
        resolvers: userResolver
    })

    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
        context: async ({ req }) => ({ req })
    })

    console.log(`Server running in port ${url}`);

}

initApp()