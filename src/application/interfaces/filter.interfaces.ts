import {Scalar} from "@nestjs/graphql/dist";

export interface IRepositoryFilter {
    where?: any
    select?: any
    orderBy?: any
    include?: any
    skip?: number
    take?: number
    cursor: any
}