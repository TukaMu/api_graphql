import { gql } from "apollo-server";

export default gql`

    type Return {
        token: String!
    }

    type Mutation {
        login(user:String!,password:String!): Return
    }
`;