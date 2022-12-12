import { Module } from '@nestjs/common';
import { UserModule } from '@application/user/user.module';
import {GraphQLModule} from "@nestjs/graphql";
import {ApolloFederationDriver, ApolloFederationDriverConfig} from "@nestjs/apollo";
import GraphQLJSON from "graphql-type-json";

@Module({
    imports: [
        UserModule,
        GraphQLModule.forRoot<ApolloFederationDriverConfig>({
            driver: ApolloFederationDriver,
            autoSchemaFile: true,
            resolvers: {JSON: GraphQLJSON}
        })
    ],
})
export class AppModule {}