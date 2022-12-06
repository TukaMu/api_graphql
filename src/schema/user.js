import { gql } from "apollo-server";

export default gql`
    type Identifiers {
        cpf:String!
        registration:String!
    }

    type User {
        identifiers: Identifiers!
        label: String!
    }

    type TokenReturn {
        token: String!
    }

    type Mutation {
        storeUser(user:String!,password:String!): TokenReturn!
    }

    type Query {
        login(user:String!,password:String!):TokenReturn!
        getUser(user:String!):User!
    }
`;