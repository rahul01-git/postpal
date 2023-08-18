export const userTypeDefs = `#graphql
    type Book {
        id: ID!
        title: String!
    } 
    
    type Query {
        books: [Book!]!
    }
`;
