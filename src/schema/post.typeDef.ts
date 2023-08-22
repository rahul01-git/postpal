export const postTypeDefs = `#graphql

    type Post {
        id: Int!
        description: String!
        like_count: Int
        user_id: Int!
        user: User
        is_liked: Boolean
        comment: [Comment]
    }
    type User {
        id: Int,
        full_name: String!,
        email:String!,
        email_verified: Boolean!  
    }

    type Comment {
        description: String!
    }

    input GetAllPostInput {
        page: Int!
        size: Int!
    }

    input UploadPostInput{
        description: String,
    }

    input UpdatePostInput {
        description: String,
        post_id: Int
    } 

    type Response {
        status_code: Int
        message: String
    }

    type Query {
      getAllPosts(data: GetAllPostInput!): [Post]
      getPostById(post_id: Int!) : Post
      getMyPosts: [Post]
    }

    type Mutation{
        createPost(data: UploadPostInput!) : Post
        updatePost(data: UpdatePostInput!) : Response!
        deletePost(post_id: Int!) : Response!
    }


`

