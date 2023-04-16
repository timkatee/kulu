import {
  Args,
  Info,
  InputType,
  Mutation,
  PartialType,
  Query,
  Resolver,
  Scalar,
} from "@nestjs/graphql/dist";
import { UserModel } from "@domain/user/user.model";
import {
  CrudOperations,
  Repository,
} from "@application/interfaces/repository.interface";
import { FilterInput } from "@commons/repository.filter.model";
import { Inject } from "@nestjs/common";
import { User } from "@domain/user/user.interface";
import { acquireRequestedGraphqlFields } from "@commons/graphql.utilities";
import { acquireSelectFields } from "@commons/prisma.utilities";

@InputType()
class UserInput extends PartialType(UserModel, InputType) {}

@Resolver((of: any) => UserModel)
export class UserService {
  constructor(@Inject("Repository") private repository: Repository<User>) {}

  @Query((returns) => UserModel, { name: "User" })
  async getUser(@Args("id") id: number, @Info() info: any): Promise<User> {
    return new UserModel(await this.repository.readSingle(id, info));
  }

  @Query((returns) => [UserModel], { name: "Users" })
  async getUsers(
    @Args("filters", { nullable: true }) filters: FilterInput,
    @Info() info: any
  ): Promise<User[]> {
    const users = await this.repository.readMany(filters, info);
    return users.map((user) => new UserModel(user));
  }

  @Mutation((returns) => UserModel)
  async createEditUser(
    @Args("userInput", {}) userInput: UserInput,
    @Args("type") type: CrudOperations,
    @Info() info: any
  ): Promise<User> {
    return await this.repository.createEdit(type, new UserModel(userInput));
  }
}
