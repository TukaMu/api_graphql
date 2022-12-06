import { gql } from "apollo-server";

export default gql`
    input Coordinates {
        lat: Float!
        lng: Float!
    }

    type Mutation {
        storeReport(
            token:String!,
            coordinates:Coordinates!,
            password:Boolean!,
            name:String!,
            comment:String!
            ): Int!
    }
`;