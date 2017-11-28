
module.exports = {
    Query: {
        allLinks: async (root, data, {mongo: {Links}}) => {
            return await Links.find({}).toArray();
        },

        // Added by me! wow. so insecure
        // Actually, MAGIC! turns out that it's not so insecure. Only "email" is exposed
        allUsers: async (root, data, {mongo: {Users}}) => {
            return await Users.find({}).toArray();
        },
    },

    Mutation: {
        createLink: async (root, data, {mongo: {Links}, user}) => {
            // Uses the user context, might fail if missing
            const newLink = Object.assign({postedById : user && user._id}, data);
            const response = await Links.insert(newLink);
            return Object.assign({id: response.insertedIds[0]}, newLink);
        },

        createUser: async (root, data, {mongo: {Users}}) => {
            const newUser = {
                name: data.name,
                // TODO not a huge fan of the structure, but apparently better going forward
                email: data.authProvider.email.email,
                password: data.authProvider.email.password,
            };
            const response = await Users.insert(newUser);
            return Object.assign({id: response.insertedIds[0]}, newUser);
        },

        signinUser: async (root, data, {mongo: {Users}}) => {
            const user = await Users.findOne({email: data.email.email});
            if (data.email.password == user.password) {
                return {token: `token-${user.email}`, user};
            }
        },
    },

    Link: {
        id: root => root._id || root.id,

        // translates the stored id into the corresponding User object
        // NOTE: this is where '@relation' syntax sugar comes in handy :-)
        // the signature here? recall that the first parameter is 'root'
        postedBy: async ({postedById}, data, {mongo: {Users}}) => {
            return await Users.findOne({_id: postedById});
        }
    },

    User: {
        id: root => root._id || root.id,
    },
};
