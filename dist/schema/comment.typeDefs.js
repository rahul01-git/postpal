"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentTypeDefs = void 0;
exports.commentTypeDefs = `#graphql

    type Comment {
        id: Int!
        description: String!
        user_id: Int!
        post_id: Int!
    }

    type Response {
        status_code: Int!
        message: String!
    }

    input PostCommentInput {
        description: String!
        post_id: Int!
    }

    input UpdateCommentInput {
        description: String!
        comment_id: Int!
    }

    type Mutation {
        createComment(data: PostCommentInput!) : Comment
        updateComment(data: UpdateCommentInput!) : Response
        deleteComment(id: Int!) : Response
    }



`;
