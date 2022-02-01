"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const type_graphql_1 = require("type-graphql");
const apollo_server_express_1 = require("apollo-server-express");
const graphql_playground_middleware_express_1 = __importDefault(require("graphql-playground-middleware-express"));
const type_graphql_2 = require("@generated/type-graphql");
const client_1 = require("@prisma/client");
const startServer = async () => {
    const app = (0, express_1.default)();
    const port = 4000;
    const prisma = new client_1.PrismaClient();
    const schema = await (0, type_graphql_1.buildSchema)({
        resolvers: type_graphql_2.resolvers,
    });
    const context = () => {
        return {
            prisma
        };
    };
    const server = new apollo_server_express_1.ApolloServer({
        schema,
        context
    });
    await server.start();
    app.get('/api', (0, graphql_playground_middleware_express_1.default)({ endpoint: '/graphql' }));
    server.applyMiddleware({ app, path: '/graphql' });
    app.listen({ port }, () => {
        console.log(`Server started on port ${port}`);
    });
};
startServer();
