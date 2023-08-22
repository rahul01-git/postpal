"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeTypeDefs = void 0;
exports.likeTypeDefs = `#graphql

    type Like {
        id: Int
        user_id: Int
        post_id: Int
        is_liked: Boolean
        post: Post
        user: User
    }

    type Post {
        description: String!
        like_count: Int
    }
    type User {
        full_name: String!,
        email:String!,
    }

    type LikeResponse {
        status_code: Int!
        is_liked: Boolean
        message: String!
    }

    type Query {
        getLikedPosts: [Like]!
    }

    type Mutation {
        postToggleLike(post_id: Int!) : LikeResponse!
    }

`;
