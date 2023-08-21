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

    input UserEmailVerify {
        email: String
        code: String
    }

    input UserLoginInput{
        email: String
        password: String
    }

    type Response{
        status_code: Int 
        message: String
    }

    type LoginResponse{
        status_code: Int!
        message: String!
        user_id: Int
        token: String
        expiresIn: String
    }


    type Query{
        getAllUsers: [User]
    }

    type Mutation{
        registerUser(data: UserRegisterInput!): User
        verifyEmail(data: UserEmailVerify!) : Response!
        loginUser(data: UserLoginInput!): LoginResponse
    }
`;
