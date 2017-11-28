
// YEAH let's hard-code some data

const links = [
    {
        id: 1,
        url: "http://www.google.com/",
        description: "An exciting new website",
    },
    {
        id: 2,
        url: "http://news.ycombinator.com",
        description: "Dolly the sheep",
    },
];

module.exports = {
    Query: {
        allLinks: () => links,
    },
    Mutation: {
        createLink: (_, data) => {
            const newLink = Object.assign({id: links.length + 1}, data);
            links.push(newLink);
            return newLink;
        }
    },
};