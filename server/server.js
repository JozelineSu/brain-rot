const express = require('express'); 
const { ApolloServer } = require('@apollo/server');// knows how to turn HTTP req and res into GrapchQl operations and runs them in context w/ support for plugins and other ft
const { expressMiddleware }=require('@apollo/server/express4');
const path = require('path');
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001; // changes PORT number to 3001
const app = express(); // our app routes will be made through express
const server = new ApolloServer({ // create a new Apollo server using our schemas
  typeDefs,
  resolvers,
});

// this entire function will create a new instance of an apollo server the with GraphAl schema
const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use('/graphql', expressMiddleware(server,  {
    context: authMiddleware
  }));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req,res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }

  //mongoose method once() will make the connection only once after the connection is 'open' NOT at every req
  db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });
  db.once('open', () => {
    console.log('MongoDb connected successfully');
  //app.listen() tells app to start listening for visitors on a specific address and port  
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}`);
      console.log(`Use GraphQl at http://localhost:${PORT}/graphql`);
    });
  });
};

// call async function to start the serv er
startApolloServer();
