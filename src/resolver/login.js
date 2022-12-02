export default {
    Mutation: {
        login: async (root, args, context) => {
            console.log({ root, args, context })
            return { token: "logado " + args.name };
        }
    }
}