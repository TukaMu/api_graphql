export default {
    Mutation: {
        storeUser: (root, args, context) => {
            return context.user.storeUser(args);
        }
    },
    Query: {
        login: (root, args, context) => {
            return context.user.login(args);
        },
        getUser: (root, args, context) => {
            return context.user.getUser(args);
        }
    }
}