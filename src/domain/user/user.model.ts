import {Entity} from "@domain/entity";
import {IUser} from "@domain/user/user.interface"
import {Directive, Field, ID, ObjectType} from '@nestjs/graphql/dist';

@ObjectType()
export class User extends Entity<IUser> implements IUser {
    @Field()
    id: number | undefined;
    @Field()
    created_at: string | undefined;
    @Field()
    full_names: string | undefined;
    @Field()
    organization_id: number | undefined;
    @Field()
    status: number | undefined;
    @Field()
    updated_at: string | undefined;

    constructor(id: number, props: IUser) {
        super(id, props);
    }
}