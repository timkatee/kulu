import { Module } from "@nestjs/common";
import { UserModule } from "@application/user/user.module";
import { GraphQLModule } from "@nestjs/graphql";
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from "@nestjs/apollo";
import GraphQLJSON from "graphql-type-json";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    GraphQLModule.forRoot({
      driver: ApolloFederationDriver,
      autoSchemaFile: { federation: 2 },
      resolvers: { JSON: GraphQLJSON },
    }),
  ],
})
export class AppModule {}
