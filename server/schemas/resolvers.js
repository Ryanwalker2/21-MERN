const { Book, User } = require('../models');

const resolvers = {
  Query: {
    user: async () => {
      return await User.find({}).populate('Book');
    }
  }
};

module.exports = resolvers;