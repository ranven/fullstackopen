const Author = require("./models/author")
const Book = require("./models/book")
const { GraphQLError } = require("graphql")
const jwt = require("jsonwebtoken")
const { PubSub } = require("graphql-subscriptions")
const pubsub = new PubSub()
const User = require("./models/user")

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allGenres: async (root, args) => {
      let genres = await Book.distinct("genres")
      return genres
    },
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
    me: (root, args, context) => {
      return context.currentUser ? context.currentUser : ""
    },
  },
  Author: {
    bookCount: async (root) => {
      let author = await Author.findOne({ name: root.name })
      return await Book.find({ author: author.id }).countDocuments()
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const book = { ...args }
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: { code: "BAD_USER_INPUT" },
        })
      }
      let author = await Author.findOne({ name: book.author })

      if (!author) {
        author = new Author({
          name: book.author,
        })
        await author.save()
      }
      newBook = new Book({ ...book, author })
      await newBook.save().catch((err) => {
        throw new GraphQLError("Adding book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: { ...args },
            err,
          },
        })
      })
      pubsub.publish("BOOK_ADDED", { bookAdded: newBook })
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: { code: "BAD_USER_INPUT" },
        })
      }

      let author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo
      return author.save().catch((err) => {
        throw new GraphQLError("Editing author failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: { ...args },
            err,
          },
        })
      })
    },
    addFavoriteGenre: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: { code: "BAD_USER_INPUT" },
        })
      }

      currentUser.favoriteGenre = args.genre
      return await currentUser.save().catch((err) => {
        throw new GraphQLError("Adding genre failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: { ...args },
            err,
          },
        })
      })
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username })
      return user.save().catch((err) => {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            err,
          },
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
}

module.exports = resolvers
