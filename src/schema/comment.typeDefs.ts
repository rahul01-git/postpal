export const commentTypeDefs = `#graphql

    type Comment {
        id: Int!
        description: String!
        user_id: Int!
        post: Post
        user: User
        post_id: Int!
    }

    type Post {
        description: String!
    }
    type User {
        full_name: String!,
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

    type Query {
        getComments(post_id: Int!) : [Comment]

    }

    type Mutation {
        createComment(data: PostCommentInput!) : Comment
        updateComment(data: UpdateCommentInput!) : Response
        deleteComment(id: Int!) : Response
    }



`