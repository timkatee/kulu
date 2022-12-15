import {Entity} from "@domain/entity";
import {IUser} from "@domain/user/user.interface"
import {Field, ObjectType, Int, GraphQLISODateTime} from '@nestjs/graphql/dist';

@ObjectType()
export class User extends Entity<IUser> implements IUser {
    @Field(type => Int)
    id: number | undefined;
    @Field(type => GraphQLISODateTime)
    createdAt: Date | undefined;
    @Field(type => GraphQLISODateTime)
    updatedAt: Date | undefined;
    @Field(type => String,{nullable:true})
    fullName: string | undefined;
    @Field(type => String,{nullable:true})
    description: string | undefined;

    constructor(props: Partial<IUser>) {
        super(props);
    }
}