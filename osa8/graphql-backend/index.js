const { ApolloServer } = require("@apollo/server")
const { startStandaloneServer } = require("@apollo/server/standalone")
const { v1: uuid } = require("uuid")

const mongoose = require("mongoose")
mongoose.set("strictQuery", false)
const Author = require("./models/author")
const Book = require("./models/book")

require("dotenv").config()

const MONGODB_URI = process.env.DB_URL
console.log("connecting to", MONGODB_URI)

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB")
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message)
  })

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

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
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
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let books = await Book.find({}).populate("author")
      if (args.author && args.genre) {
        return books.filter(
          (b) => b.author.name === args.author && b.genres.includes(args.genre)
        )
      } else if (args.author) {
        return books.filter((b) => b.author.name === args.author)
      } else if (args.genre) {
        return books.filter((b) => b.genres.includes(args.genre))
      } else {
        return books
      }
    },
    allAuthors: async () => Author.find({}),
  },
  Author: {
    bookCount: (root) => Book.find({ author: root.name }).countDocuments(),
  },
  Mutation: {
    addBook: async (root, args) => {
      const book = { ...args }
      const author = await Author.findOne({ name: book.author })
      if (!author) {
        authorCount = new Author({
          name: book.author,
        })
        author.save()
      }

      newBook = new Book({ ...book, author })
      return newBook.save()
    },
    editAuthor: async (root, args) => {
      let author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo
      return author.save()
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
