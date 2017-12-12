const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');
// const connectMongo = require('../mongo-connector');

// define types here
const typeDefs = `
  type Link {
    id: ID!
    url: String!
    description: String!
    postedBy: User
    votes: [Vote!]!
  }

  type Vote {
    id: ID!
    user: User!
    link: Link!
  }

  type User {
    id: ID!
    name: String!
    email: String
    votes: [Vote!]!
  }

  type SigninPayload {
    token: String
    user: User
  }

  type Query {
    allLinks: [Link!]!
  }

  input AuthProviderSignupData {
    email: AUTH_PROVIDER_EMAIL
  }

  input AUTH_PROVIDER_EMAIL {
    email: String!
    password: String!
  }

  type Mutation {
    createLink(url: String!, description: String!): Link
    createVote(linkId: ID!): Vote
    createUser(name: String!, authProvider: AuthProviderSignupData!): User
    signinUser(email: AUTH_PROVIDER_EMAIL): SigninPayload!
  }
`;

// generate the schema object from the typeDefs string
module.exports = makeExecutableSchema({ typeDefs, resolvers /*, connectors: connectMongo*/ });
