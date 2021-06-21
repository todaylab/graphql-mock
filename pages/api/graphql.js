import { ApolloServer, gql } from 'apollo-server-micro'
import cors from 'micro-cors' // highlight-line

const topdomains = [
    {
        id: 1,
        name: 'com',
    },
    {
        id: 2,
        name: 'cn',
    },
    {
        id: 3,
        name: 'io',
    },
    {
        id: 4,
        name: 'top',
    },
];

const typeDefs = gql`
type TopDomain {
    id: Int
    name: String
}

type Query {
    topdomains: [TopDomain]
}
`

const resolvers = {
    Query: {
        topdomains: () => topdomains,
    },
}

const apolloServer = new ApolloServer({ typeDefs, resolvers })

export const config = {
  api: {
    bodyParser: false,
  },
}

//export default apolloServer.createHandler({ path: '/api/graphql' })

export default apolloServer.start().then(() => {
    const handler = apolloServer.createHandler({ path: '/api/graphql' }); // highlight-line
    return cors((req, res) => req.method === 'OPTIONS' ? res.end() : handler(req, res)) // highlight-line
});