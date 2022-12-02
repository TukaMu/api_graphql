import { gql } from "apollo-server";

export default gql`
    type User{
        name: String!
        status: Boolean!
        email: String
    }

    type Query {
        user: User!
    }
`;