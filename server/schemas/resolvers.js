const { Book, User } = require('../models');
const { AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return await User.find({}).populate('Book');
    },
    user: async (parent, { userId }) => {
      return await User.findOne({ _id: userId });
    },
    books: async () => {
      return await Book.find();
    },
    book: async (parent, { bookId }) => {
      return await Book.findOne({ _id: bookId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user.userId }).populate('books');
      }
      throw AuthenticationError;
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    removeUser: async (parent, { userId }) => {
      return User.findOneAndDelete({ _id: userId });
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    }
  }
};

module.exports = resolvers;