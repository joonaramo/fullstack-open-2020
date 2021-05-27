const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');
const Author = require('./models/author');
const Book = require('./models/Book');

const MONGODB_URI =
  'mongodb+srv://root:zXgiq81bAnut28T4@cluster0.agt8v.mongodb.net/library?retryWrites=true&w=majority';

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message);
  });

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }
  type Author {
    name: String!
    born: Int
    bookCount: Int
    id: ID!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [Author]!
  }
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      return Book.find({ genres: { $in: args.genre } }).populate('author');
    },
    allAuthors: () => {
      return Author.find();
    },
  },
  Author: {
    bookCount: (root) => Book.find({ author: root._id }).countDocuments(),
  },
  Mutation: {
    addBook: async (root, args) => {
      const book = new Book({ ...args });
      const authorFound = await Author.findOne({ name: args.author });
      if (!authorFound) {
        const author = new Author({ name: args.author });
        await author.save();
        book.author = author;
      } else {
        book.author = authorFound;
      }
      return book.save();
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name });
      author.born = args.setBornTo;
      return author.save();
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
