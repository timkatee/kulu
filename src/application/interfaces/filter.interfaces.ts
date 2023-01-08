export interface RepositoryFilter {
    where?: any
    select?: any
    orderBy?: any
    include?: any
    skip?: number
    take?: number
    cursor: any
    all: Boolean
}