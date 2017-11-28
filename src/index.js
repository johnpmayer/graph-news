
const express = require('express');

// parsing json requests automagic
const bodyParser = require('body-parser');

// auto-graphql-server given a schema definition
const {graphqlExpress, graphiqlExpress} = require('apollo-server-express');

const schema = require('./schema');

var app = express(); // hello old friend

// TODO, some magic here. 3rd argument looks like the handler, not sure about the 2nd argument
app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));

// Ooh, neat!
app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
}));

const PORT = 3000; // whatever

app.listen(PORT, () => {
    console.log(`psst, don't look behind door number ${PORT}`)
});