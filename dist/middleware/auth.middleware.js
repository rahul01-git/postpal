"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const graphql_1 = require("graphql");
const JWT_SECRET = process.env.JWT_SECRET;
async function authenticate(bearerToken) {
    try {
        const token = bearerToken.split('Bearer ')[1];
        if (token) {
            try {
                const user = jsonwebtoken_1.default.verify(token, JWT_SECRET);
                // const user = (await User.findByPk(decoded.id) as UserInterface)
                if (user) {
                    return {
                        user,
                        token
                    };
                }
                throw new graphql_1.GraphQLError('User not found', {
                    extensions: {
                        code: 'UNAUTHORIZED',
                        http: { status: 402 }
                    }
                });
            }
            catch (error) {
                throw new Error('Invalid / Expired token');
            }
        }
        throw new Error("Authorization token must be 'Bearer [token]'");
    }
    catch (error) {
        throw new Error("Error: " + error);
    }
}
exports.authenticate = authenticate;
