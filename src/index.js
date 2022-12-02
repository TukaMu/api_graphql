import { ApolloServer } from "apollo-server";
import schema from "./schema/user.js";
import resolve from "./resolver/user.js";
import schema1 from "./schema/login.js";
import resolve1 from "./resolver/login.js";

const typeDefs = [schema, schema1];
const resolvers = [resolve, resolve1];

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log("Rodando - " + url);
});