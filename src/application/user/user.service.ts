import {Args, InputType, Mutation, PartialType, Query, Resolver, Scalar} from '@nestjs/graphql/dist';
import {User} from "@domain/user/user.model"
import {CrudOperations, IRepository, ReadModes} from "@application/interfaces/repository.interface";
import {FilterInput} from "@commons/repository.filter.model";
import {Inject} from "@nestjs/common";

@InputType()
class UserInput extends PartialType(User, InputType) {

}

@Resolver((of: any) => User)
export class UserService {
    constructor(@Inject('IRepository') private repository: IRepository<User>) {
    }

    @Query((returns) => User, {name: "User"})
    async getUser(@Args('id') id: number): Promise<User | User[]> {
        return await this.repository.read(ReadModes.SINGLE, {where: {id: id}});
    }

    @Query((returns) => [User], {name: "Users"})
    async getUsers(@Args('filters', {nullable: true}) filters: FilterInput): Promise<User | User[]> {
        return await this.repository.read(ReadModes.ALL, filters);
    }

    @Mutation((returns) => User)
    async createEditUser(@Args('userInput',{}) userInput: UserInput,@Args('type') type: CrudOperations): Promise<User>{
        return await this.repository.createEdit(type, userInput)
    }
}