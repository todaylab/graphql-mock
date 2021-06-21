import { ApolloServer, gql } from 'apollo-server-micro'

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

const allowCors = fn => async (req, res) => {
        res.setHeader('Access-Control-Allow-Credentials', true)
        res.setHeader('Access-Control-Allow-Origin', '*')
        // another common pattern
        // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
        res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
        res.setHeader(
            'Access-Control-Allow-Headers',
            'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
        )
        if (req.method === 'OPTIONS') {
            res.status(200).end()
            return
        }
        return await fn(req, res)
    }

export default allowCors(apolloServer.createHandler({ path: '/api/graphql' }))