import "reflect-metadata"
import express from 'express';
import { UserResolver } from "./modules/user/user.resolver";
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';
import graphiql from "graphql-playground-middleware-express";
import { CategoryResolver } from './modules/category/category.resolver';
import { PrismaClient } from '@prisma/client';
import { resolvers } from "@generated/type-graphql";

const startServer = async () => {
    const app = express();
    const port = 4000;
    const prisma = new PrismaClient()

    const schema = await buildSchema({
        resolvers: resolvers,
    })

    const context = () => {
        return {
            prisma
        }
    }

    const server = new ApolloServer({
        schema,
        context
    })

    await server.start();

    app.get('/api', graphiql({ endpoint: '/graphql' }))
    server.applyMiddleware({ app, path: '/graphql' })

    app.listen({ port }, () => {
        console.log(`Server started on port ${port}`);
    })
}

startServer();