import { ApolloServer } from "apollo-server";
import userSchema from "./user/schema/user.js";
import userResolver from "./user/resolvers/index.js";

const typeDefs = [userSchema];
const resolvers = [userResolver];

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log("Rodando - " + url)
});