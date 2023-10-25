const typeDefs = `
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int
  } 

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    allGenres: [String]
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String
    ): User
    login(
      username: String!
      password: String!
    ): Token
    addFavoriteGenre(
      genre: String!
    ): User
  }

  type Subscription {
    bookAdded: Book!
  }
`
module.exports = typeDefs

//todo: change index.js jne (tilaukset palvelimella, step 3), dependencies installed
