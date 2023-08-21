"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postTypeDefs = void 0;
exports.postTypeDefs = `#graphql

    type Post {
        id: Int!
        description: String!
        like_count: Int
        user_id: Int!
        is_liked: Boolean
    }

    input GetAllPostInput {
        page: Int!
        size: Int!
    }

    type Query {
      getAllPosts(data: GetAllPostInput!): [Post]
    }


`;
