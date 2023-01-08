import {RepositoryFilter} from "@application/interfaces/filter.interfaces"
import {Field, InputType, Int, ObjectType, PartialType} from "@nestjs/graphql/dist";
import GraphQLJSON from "graphql-type-json";

@ObjectType()
export class RepositoryFilterModel implements RepositoryFilter {
    @Field(() => GraphQLJSON)
    cursor: any;
    @Field(() => GraphQLJSON)
    include: any;
    @Field(() => GraphQLJSON)
    orderBy: any;
    @Field(() => GraphQLJSON)
    select: any;
    @Field(() => Int)
    skip: number = 0;
    @Field(() => Int)
    take: number = 25;
    @Field(() => GraphQLJSON)
    where: any;
    @Field(() => Boolean)
    all: Boolean = false;
}

@InputType()
export class FilterInput extends PartialType(RepositoryFilterModel, InputType) {
    constructor() {
        super();
        this.take = 25
    }
}