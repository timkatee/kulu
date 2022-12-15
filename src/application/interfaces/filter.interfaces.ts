import {Scalar} from "@nestjs/graphql/dist";

export interface RepositoryFilter {
    where?: any
    select?: any
    orderBy?: any
    include?: any
    skip?: number
    take?: number
    cursor: any
}