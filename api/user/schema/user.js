import { gql } from "apollo-server";

export default gql`
    type User {
        nome: String!
        ativo: Boolean!
        email: String
    }

    type Query {
        users: [User]
        firstUser: User
    }
`;