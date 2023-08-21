import jwt, { JwtPayload } from 'jsonwebtoken'
import {GraphQLError} from 'graphql'
import { User } from '../models'
import { UserInterface } from '../interfaces'
const JWT_SECRET = process.env.JWT_SECRET!

export async function authenticate(bearerToken: string) {
    try {
        const token  = bearerToken.split('Bearer ')[1]
        if(token){
            try {
                const user = jwt.verify(token,JWT_SECRET)
                // const user = (await User.findByPk(decoded.id) as UserInterface)

                if(user) {
                    return {
                        user,
                        token
                    }
                }
                throw new GraphQLError('User not found', {
                    extensions: {
                        code: 'UNAUTHORIZED',
                        http: {status: 402}
                    }
                })

            } catch (error) {
                throw new Error('Invalid / Expired token')
            }
        }
        throw new Error("Authorization token must be 'Bearer [token]'")
    } catch (error) {
        throw new Error("Error: " + error)
    }
}