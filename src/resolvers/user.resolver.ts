const books = [
    {
      "id": "1",
      "title": "The Great Gatsby"
    },
    {
      "id": "2",
      "title": "To Kill a Mockingbird"
    },
    {
      "id": "3",
      "title": "1984"
    },
    {
      "id": "4",
      "title": "Pride and Prejudice"
    },
    {
      "id": "5",
      "title": "Harry Potter and the Sorcerer's Stone"
    }
  ]
  
export const userResolver = {
    Query: {
        books: async (parent: any, args: any, context: any) => {
            return books
        },
    },
}