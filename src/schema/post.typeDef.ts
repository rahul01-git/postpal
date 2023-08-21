export const postTypeDefs = `#graphql

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
      getPostById(post_id: Int!) : Post
      getMyPosts: [Post]
    }


`

