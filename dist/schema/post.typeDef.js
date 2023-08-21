"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postTypeDefs = void 0;
exports.postTypeDefs = `#graphql

    type Post {
        id: Int!
        description: String!
        like_count: Int
        user_id: Int!
        user: User
        is_liked: Boolean
    }
    type User {
        id: Int,
        full_name: String!,
        email:String!,
        email_verified: Boolean!  
    }

    input GetAllPostInput {
        page: Int!
        size: Int!
    }

    input UploadPostInput{
        description: String,
    }

    type Query {
      getAllPosts(data: GetAllPostInput!): [Post]
      getPostById(post_id: Int!) : Post
      getMyPosts: [Post]
    }

    type Mutation{
        createPost(data: UploadPostInput!) : Post
    }


`;
