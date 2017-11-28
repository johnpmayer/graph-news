
const {makeExecutableSchema} = require('graphql-tools');
const resolvers = require('./resolvers');

// Type definitions
const typeDefs = `
    type Link {
        id: ID!
        url: String!
        description: String!
        postedBy: User
    }

    type Query {
        allLinks: [Link!]!

        # Added by me. password isn't exposed because it's not in the type 'User'... cool?
        allUsers: [User!]!
    }

    type User {
        id: ID!
        name: String!
        email: String
    }

    type SigninPayload {
        token: String
        user: User
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

        # using custom "input" types magic
        createUser(name: String!, authProvider: AuthProviderSignupData!): User

        signinUser(email: AUTH_PROVIDER_EMAIL): SigninPayload!
    }
`;

// TODO: move typeDefs into an external file

// Generate schema object
// TODO: more magic happening here
module.exports = makeExecutableSchema({typeDefs, resolvers});