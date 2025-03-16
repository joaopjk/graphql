const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
    # Pontos de entrada da sua API!
    type Query {
        hello: String!,
        dataHoraAtual: String!
    }
`;
const resolvers = {
    Query: {
        hello: () => 'Hello world!',
        dataHoraAtual: () => new Date().toISOString()
    },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});