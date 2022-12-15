import {IRepositoryFilter} from "@application/interfaces/filter.interfaces"
import {Field, InputType, Int, ObjectType, PartialType} from "@nestjs/graphql/dist";
import GraphQLJSON from "graphql-type-json";

@ObjectType()
export class RepositoryFilter implements IRepositoryFilter {
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
}

@InputType()
export class FilterInput extends PartialType(RepositoryFilter, InputType) {
    constructor() {
        super();
        this.take = 25
    }
}