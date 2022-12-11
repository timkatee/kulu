import { Args, Query, Resolver, ResolveReference } from '@nestjs/graphql/dist';
import {User} from "@domain/user/user.model"
// import {User} from "@domain/user/user.model"
import {Repository} from "@infrastructure/database/repository"

@Resolver((of: any) => User)
export class UserService{
    constructor(private repository: Repository<User>) {}

    @Query((returns) => User)
    async getUser(@Args('id') id: number): Promise<User> {
        return await this.repository.findById(id);
    }
}