import express from 'express';
import { UserResolver } from "./modules/user/user.resolver";
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';
import graphiql from "graphql-playground-middleware-express";

const startServer = async () => {
    const app = express();
    const port = 4000;
    
    const schema = await buildSchema({
        resolvers: [UserResolver],
    })

    const server = new ApolloServer({
        schema,
    })

    await server.start();

    app.get('/api', graphiql({ endpoint: '/graphql' }))
    server.applyMiddleware({ app, path: '/graphql' })

    app.listen({port},() => {
        console.log(`Server started on port ${port}`);
    })
}

startServer();