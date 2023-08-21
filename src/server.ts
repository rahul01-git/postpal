import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import {mergeTypeDefs, mergeResolvers} from '@graphql-tools/merge'
import { userResolver,postResolver } from './resolvers'
import { userTypeDefs,postTypeDefs } from './schema'
import { sequelize } from './config'
import { Context } from './helpers'
import { UserInterface } from './interfaces'


const initApp = async () => {

    interface MyContext {
        user?: UserInterface | null,
        token? : string | undefined
    }
    const mergedTypeDefs = mergeTypeDefs([
        userTypeDefs,
        postTypeDefs
    ])
    
    const mergedResolvers = mergeResolvers([
        userResolver,
        postResolver
    ])
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    
    const server = new ApolloServer<MyContext>({
        typeDefs:mergedTypeDefs,
        resolvers: mergedResolvers,        
      });
      

    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
        context: Context
    });

    console.log(`Server running: ${url}`);
}
initApp();