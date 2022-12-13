import {Module} from '@nestjs/common';
import {UserService} from '@application/user/user.service';
import {Repository} from "@infrastructure/database/repository"

@Module({
    providers: [UserService, {
        provide: 'IRepository',
        useValue: new Repository('users')
    }],
})

export class UserModule {}