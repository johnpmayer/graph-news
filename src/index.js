
const express = require('express');

// parsing json requests automagic
const bodyParser = require('body-parser');

// auto-graphql-server given a schema definition
const {graphqlExpress, graphiqlExpress} = require('apollo-server-express');

const schema = require('./schema');

const connectMongo = require('./mongo-connector');

const {authenticate} = require('./authentication');

const start = async () => {

    const mongo = await connectMongo();
    var app = express(); // hello old friend
    
    const buildOptions = async (req, res) => {
        const user = await authenticate(req, mongo.Users); // Ok, here's some magic!
        return {
            context: {mongo, user},
            schema,
        };
    };

    // TODO, some magic here. 3rd argument looks like the handler, not sure about the 2nd argument
    // TODO: more magic w.r.t. the "context" thingy
    app.use('/graphql', bodyParser.json(), graphqlExpress(buildOptions));

    // Ooh, neat!
    app.use('/graphiql', graphiqlExpress({
        endpointURL: '/graphql',
        
        // Hard codes the user ONLY for the interactive front-end
        passHeader: `'Authorization': 'bearer token-john@john'`,
    }));

    const PORT = 3000; // whatever
    
    app.listen(PORT, () => {
        console.log(`psst, don't look behind door number ${PORT}`)
    });

};

// TODO: research how async works in JS, hand-wavy but feels nice :-)
start();

