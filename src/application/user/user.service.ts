import {Args, Query, Resolver, ResolveReference, PartialType, InputType} from '@nestjs/graphql/dist';
import {Inject} from '@nestjs/common';
import {User} from "@domain/user/user.model"
import {Repository} from "@infrastructure/database/repository"

@InputType()
class UserInput extends PartialType(User, InputType){

}

@Resolver((of: any) => User)
export class UserService {
    constructor(@Inject('REPOSITORY') private repository: Repository<User>) {}

    @Query((returns) => User, {name: "User"})
    async getUser(@Args('id') id: number): Promise<User> {
        return await this.repository.findById(id);
    }

    @Query((returns) => [User], {name: "Users"})
    async getUsers(@Args('filters',{nullable:true}) filters: UserInput): Promise<User[]> {
        return await this.repository.findAll(filters);
    }
}