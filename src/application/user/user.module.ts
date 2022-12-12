import {
    ApolloFederationDriver,
    ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import {Module} from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql';
import {UserService} from '@application/user/user.service';
import {Repository} from "@infrastructure/database/repository"

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloFederationDriverConfig>({
            driver: ApolloFederationDriver,
            autoSchemaFile: true,
        })
    ],
    providers: [UserService, {
        provide: 'REPOSITORY',
        useValue: new Repository('users')
    }],
})

export class UserModule {}