"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_resolver_1 = require("./modules/user/user.resolver");
const type_graphql_1 = require("type-graphql");
const apollo_server_express_1 = require("apollo-server-express");
const graphql_playground_middleware_express_1 = __importDefault(require("graphql-playground-middleware-express"));
const startServer = async () => {
    const app = (0, express_1.default)();
    const port = 4000;
    const schema = await (0, type_graphql_1.buildSchema)({
        resolvers: [user_resolver_1.UserResolver],
    });
    const server = new apollo_server_express_1.ApolloServer({
        schema,
    });
    await server.start();
    app.get('/api', (0, graphql_playground_middleware_express_1.default)({ endpoint: '/graphql' }));
    server.applyMiddleware({ app, path: '/graphql' });
    app.listen({ port }, () => {
        console.log(`Server started on port ${port}`);
    });
};
startServer();
