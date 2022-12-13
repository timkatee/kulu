import {Args, Info, InputType, Mutation, PartialType, Query, Resolver, Scalar} from '@nestjs/graphql/dist';
import {User} from "@domain/user/user.model"
import {CrudOperations, IRepository} from "@application/interfaces/repository.interface";
import {FilterInput} from "@commons/repository.filter.model";
import {Inject} from "@nestjs/common";
import {IUser} from "@domain/user/user.interface";
import {acquireRequestedGraphqlFields} from "../../commons/graphql.utilities";

@InputType()
class UserInput extends PartialType(User, InputType) {

}

@Resolver((of: any) => User)
export class UserService {
    constructor(@Inject('IRepository') private repository: IRepository<IUser>) {}

    @Query((returns) => User, {name: "User"})
    async getUser(
        @Args('id') id: number,
        @Info() info: any
    ): Promise<IUser | IUser[]> {
        return new User(await this.repository.readSingle(id));
    }

    @Query((returns) => [User], {name: "Users"})
    async getUsers(
        @Args('filters', {nullable: true}) filters: FilterInput,
        @Info() info: any
    ): Promise<IUser[]> {
        console.log(acquireRequestedGraphqlFields(info))
        let users = await this.repository.readMany(filters);
        return users.map(user => new User(user))
    }

    @Mutation((returns) => User)
    async createEditUser(
        @Args('userInput', {}) userInput: UserInput,
        @Args('type') type: CrudOperations,
        @Info() info: any
    ): Promise<IUser> {
        return await this.repository.createEdit(type, new User(userInput))
    }
}