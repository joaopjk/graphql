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

    type Produto {
        id: ID!
        nome: String!
        preco: Float!
        desconto: Float
        precoComDesconto: Float
    }

    # Pontos de entrada da sua API!
    type Query {
        hello: String!,
        dataHoraAtual: Date!,
        usuarioLogado: Usuario,
        produtoEmDestaque: Produto,
        numerosMegaSena: [Int!]!
    }
`;

const resolvers = {
    Usuario: {
        salario(usuario) {
            return usuario.salario_real
        }
    },

    Produto: {
        precoComDesconto(produto) {
            if (produto.desconto) {
                return produto.preco * (1 - produto.desconto)
            }
            return produto.preco
        }
    },

    Query: {
        hello: () => 'Hello world!',
        dataHoraAtual: () => new Date,
        usuarioLogado: () => ({
            id: 1,
            nome: 'Joao Sousa',
            email: 'joao.sousa@email.com',
            idade: 25,
            salario_real: 1000.00,
            vip: true
        }),
        produtoEmDestaque: () => ({
            id: 1,
            nome: 'Notebook',
            preco: 2000.00,
            desconto: 0.10
        }),
        numerosMegaSena() {
            const crescente = (a, b) => a - b
            return Array(6).fill(0)
                .map(() => parseInt(Math.random() * 60 + 1))
                .sort(crescente)
        }
    }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});