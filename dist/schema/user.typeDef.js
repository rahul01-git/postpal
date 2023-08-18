"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userTypeDefs = void 0;
exports.userTypeDefs = `#graphql
    type Book {
        id: ID!
        title: String!
    } 
    
    type Query {
        books: [Book!]!
    }
`;
