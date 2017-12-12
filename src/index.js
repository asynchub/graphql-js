const express = require('express');

const { authenticate } = require('./authentication');

// automatically parses JSON requests
const bodyParser = require('body-parser');

// handles GraphQL server requests and responses, based on schema
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');

const schema = require('./schema');

const connectMongo = require('./mongo-connector');

const buildDataloaders = require('./dataloaders');

const start = async () => {
  const mongo = await connectMongo();

  var app = express();

  const buildOptions = async (req, res) => {
    const user = await authenticate(req, mongo.Users);
    return {
      context: { dataloaders: buildDataloaders(mongo), mongo, user },
      schema,
    }
  };

  app.use('/graphql', bodyParser.json(), graphqlExpress(buildOptions));
  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
    passHeader: `'Authorization': 'bearer token-user2@test.com'`,
  }));

  const PORT = 3000;

  app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
  });
};

start();
