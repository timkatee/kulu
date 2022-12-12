import {Entity} from "@domain/entity";
import {IUser} from "@domain/user/user.interface"
import {Directive, Field, ID, ObjectType, Int, GraphQLISODateTime} from '@nestjs/graphql/dist';

@ObjectType()
export class User extends Entity<IUser> implements IUser {
    @Field(type => Int)
    id: number | undefined;
    @Field(type => GraphQLISODateTime)
    created_at: string | undefined;
    @Field(type => String,{nullable:true})
    full_names: string | undefined;
    @Field(type => Int)
    organization_id: number | undefined;
    @Field(type => Int)
    status: number | undefined;
    @Field(type => GraphQLISODateTime)
    updated_at: string | undefined;

    constructor(id: number, props: IUser) {
        super(id, props);
    }
}