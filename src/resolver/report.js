export default {
    Mutation: {
        storeReport: (root, args, context) => {
            return context.report.storeReport(args);
        }
    }
}