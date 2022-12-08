import { gql } from "apollo-server";

export default gql`
    input CoordinatesInput {
        lat: Float!
        lng: Float!
    }

    type Coordinates {
        lat: Float!
        lng: Float!
    }

    type Report {
        coordinates: Coordinates!
        password: Boolean!
        name: String!
        comment: String!
        createdAt: String!
        label: String!
        status: String!
    }

    type YesNo {
        yes: Int!
        no: Int!
    }

    type DashBoardData {
        password: YesNo!
        reportsWeek: YesNo!
        pendingStatus: YesNo!
    }

    type DashBoard {
        totalReports: Int!
        reports: [Report!]!
        data: DashBoardData!
    }

    type Query {
        dashBoard(token: String!): DashBoard!
    }

    type Mutation {
        storeReport(
            token:String!,
            coordinates:CoordinatesInput!,
            password:Boolean!,
            name:String!,
            comment:String!
            ): Int!
    }
`;