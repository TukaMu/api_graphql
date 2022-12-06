import { ApolloServer } from "apollo-server";
import context from "./models/index.js";
import resolvers from "./resolver/index.js";
import typeDefs from "./schema/index.js";

const server = new ApolloServer({ typeDefs, resolvers, context });

server.listen().then(({ url }) => {
    console.log("Rodando - " + url);
});