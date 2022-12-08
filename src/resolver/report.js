export default {
    Query: {
        dashBoard: (root, args, context) => {
            return context.report.dashBoard(args);
        }
    },
    Mutation: {
        storeReport: (root, args, context) => {
            return context.report.storeReport(args);
        }
    }
}