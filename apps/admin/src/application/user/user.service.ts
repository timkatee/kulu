import {
  Args,
  Info,
  InputType,
  Mutation,
  PartialType,
  Query,
  Resolver,
} from "@nestjs/graphql/dist";
import { UserModel } from "@domain/user/user.model";
import { kTypes } from "@kulu/common";
import { FilterInput } from "@kulu/common";
import { Inject, Injectable } from "@nestjs/common";
import { User } from "@domain/user/user.interface";

@InputType()
class UserInput extends PartialType(UserModel, InputType) {}

@Resolver((of: any) => UserModel)
@Injectable()
export class UserService {
  constructor(
    @Inject("Repository") private repository: kTypes.Repository<User>
  ) {}

  @Query((returns) => UserModel, { name: "User" })
  async getUser(@Args("id") id: number, @Info() info: any): Promise<User> {
    return new UserModel(await this.repository.readSingle(id, info));
  }

  @Query((returns) => [UserModel], { name: "Users" })
  async getUsers(
    @Args("filters") filters: FilterInput,
    @Info() info: any
  ): Promise<User[]> {
    const users = await this.repository.readMany(filters, info);
    return users.map((user) => new UserModel(user));
  }

  @Mutation((returns) => UserModel)
  async createEditUser(
    @Args("userInput", {}) userInput: UserInput,
    @Args("type") type: kTypes.CrudOperations,
    @Info() info: any
  ): Promise<User> {
    return await this.repository.createEdit(type, new UserModel(userInput));
  }
}
