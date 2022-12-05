export default {
    Mutation: {
        login: async (root, args, context) => {
            // console.log({ root, args, context })
            return context.login(args);
        }
    }
}