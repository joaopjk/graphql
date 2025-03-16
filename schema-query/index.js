const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
    scalar Date

    type Usuario {
        id: ID!
        nome: String!
        email: String!
        idade: Int
        salario: Float
        vip: Boolean
    }

    # Pontos de entrada da sua API!
    type Query {
        hello: String!,
        dataHoraAtual: Date!,
        usuarioLogado: Usuario
    }
`;
const resolvers = {
    Query: {
        hello: () => 'Hello world!',
        dataHoraAtual: () => new Date,
        usuarioLogado: () => ({
            id: 1,
            nome: 'Joao Sousa',
            email: 'joao.sousa@email.com',
            idade: 25,
            salario: 1000.00,
            vip: true
        })
    }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});