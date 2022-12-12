import {Module} from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql';
import {UserService} from '@application/user/user.service';
import {Repository} from "@infrastructure/database/repository"
import {IRepository} from "@application/interfaces/repository.interface"

@Module({
    providers: [UserService, {
        provide: 'IRepository',
        useValue: new Repository('users')
    }],
})

export class UserModule {}