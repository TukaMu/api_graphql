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
        type: String!
    }

    type StoreUSerTokenReturn {
        token: String!
    }

    type Mutation {
        storeUser(user:String!,password:String!): StoreUSerTokenReturn!
    }

    type Query {
        login(user:String!,password:String!):TokenReturn!
        getUser(user:String!):User!
    }
`;