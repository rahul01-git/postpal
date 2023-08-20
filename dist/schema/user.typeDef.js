"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userTypeDefs = void 0;
exports.userTypeDefs = `#graphql
    type User {
        id: Int,
        full_name: String!,
        email:String!,
        email_verified: Boolean!  
    }
    
    input UserRegisterInput{
        full_name: String,
        email: String,
        password:String
    }


    type Query{
        getAllUsers: [User]
    }

    type Mutation{
        registerUser(data: UserRegisterInput!): User
    }
`;
