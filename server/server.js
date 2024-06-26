const express = require('express');
//Import Apolloserver class and middleware for express helper.
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { authMiddleware } = require('./utils/auth');

//Imports for GraphQL
const { typeDefs, resolvers } = require('./schemas');

const path = require('path');
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 4000;
const server = new ApolloServer({
  typeDefs,
  resolvers
});

const startApolloServer = async () => {
  await server.start();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

app.use('/graphql', expressMiddleware(server, {
  context: authMiddleware
}));

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  })
})
};

startApolloServer();
