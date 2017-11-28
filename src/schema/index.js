
const {makeExecutableSchema} = require('graphql-tools');
const resolvers = require('./resolvers');

// Type definitions
const typeDefs = `
    type Link {
        id: ID!
        url: String!
        description: String!
    }

    type Query {
        allLinks: [Link!]!
    }

    type Mutation {
        createLink(url: String!, description: String!): Link
    }
`;

// TODO: move typeDefs into an external file

// Generate schema object
// TODO: more magic happening here
module.exports = makeExecutableSchema({typeDefs, resolvers});