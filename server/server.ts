import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";
import express from "express";
import cors from "cors";
import http from "http";
import resolvers from "./api/resolvers";

const app = express();

const typeDefs = mergeTypeDefs(loadFilesSync(`api/schemas/**/*.graphql`));

const httpServer = http.createServer(app);

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await apolloServer.start();

app.use(
  "/",
  cors<cors.CorsRequest>(),
  express.json(),
  expressMiddleware(apolloServer)
);

app.get("/", (req, res) => {
  res.send("Hello World");
});

await new Promise<void>((resolve) =>
  httpServer.listen({ port: 3000 }, resolve)
);

console.log(`🚀 Server ready at http://localhost:3000/`);
