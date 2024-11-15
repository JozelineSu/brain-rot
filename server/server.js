/**things we get from our packagejson */
//how we will be doing our routing (how app endpoints(URIs) respond to client req)
// GET POST PUT DELETE
const express = require('express'); 
// define a schema for data and query it
const { ApolloServer } = require('@apollo/server');// knows how to turn HTTP req and res into GrapchQl operations and runs them in context w/ support for plugins and other ft
const { expressMiddleware }=require('@appollo/server/express4');
const path = require('path');
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const { start } = require('repl');

const PORT = process.env.PORT || 3001; // changes PORT number to 3001
const app = express(); // our app routes will be made through express
const server = new ApolloServer({ // create a new Apollo server using our schemas
  typeDefs,
  resolvers,
});

// this entire function will create a new instance of an apollo server the with GraphAl schema
const startApolloServer = async () => {
  await server.start();

  //as req.body are client(user)-controlled input its properties+values in the object are untrusted and should be validated
  //it is express mmiddleware that parses url-encoded payloads from HTTP POst req, typically forms data and popultaes rez.body with key-value pairs supports extended and simple pasing options
  // urls must conform to URI specifiaction so they can only contain a subset of ASCII characters
  // url encoding makes sure valid URLS and data are passed betweeen we app and the server
  // settting it to extended means we will parse(break down) the url-encoded data with qerystring library which has more limits compared to true option, the qs library(allows us to create nested objects with query strings and it can parse nested objects) 
  app.use(express.urlencoded({ extended: false }));
  // middleware that pareses incoming request with JSON payload
  //important for parsing incoming JSON payloads and making that data available in the req.body or further processing within the routes(HTTP req)
  // without this express will not automatically parse the JSON data from client to server
  app.use(express.json());


//create a route where GraphQl API is accessible when a req comes to this route following middleware is executed:
// espressMiddleware functin enables you to attach apollo server to an express server
// server is an instance of the ApolloServer which is the core of GraphQl server, it has the graphQl schema and resolvers which define the structure and behavior of your API
//context function returns an object that all servers resolvers share during an operations executrion
// context is a middleware function that eill be executed BEFORE each GraphQl req
app.use('/graphql', expressMiddleware(server,  {
    context: authMiddleware
  }));

// process.env refers to an object that consists of name/values pairs that represent the current state of the environment variables witin nodejs process
// NODE_ENV dictatien the environment an app is running in
// setting it to production mode means loggin is kept to a minimum, cache view templates, generate less verbose error messages cache css files generated from css exte4nsions
// setting it to production improves app perforamnce for abocve reasons
// cache: collection of items of same type stored in hidden/inaccessible place 
if (process.env.NODE_ENV === 'production') {
  // express.static() is middleware fcuntion to serve static files like img, css files, js files
  // path.join() is function of nodes path module which joins all given path segments together
  app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req,res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }

  //mongoose method once() will make the connection only once after the connection is 'open' NOT at every req
  db.once('open', () => {
  //app.listen() tells app to start listening for visitors on a specific address and port  
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}`);
      console.log(`Use GraphQl at http://localhost:${PORT}/graphql`);
    });
  });
};

// call async function to start the serv er
startApolloServer();
