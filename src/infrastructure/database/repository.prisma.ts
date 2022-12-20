import {prisma, PrismaClient} from "@infrastructure/database/prisma/client";
import {Injectable} from '@nestjs/common';
import {Repository, CrudOperations} from "@application/interfaces/repository.interface";
import {RepositoryFilter} from "@application/interfaces/filter.interfaces";
import {GraphQLError} from "graphql";
import {acquireSelectFields, getDataModelAttributes} from "@commons/prisma.utilities";
import {acquireRequestedGraphqlFields} from "@commons/graphql.utilities";

@Injectable()
export class RepositoryPrisma<T> implements Repository<T> {
    modelAttributes?: {}

    constructor(private entity: string) {
        this.initialize().then(r => r).catch(err => this.onError(err));
    }

    async initialize(): Promise<void> {
        this.modelAttributes = await getDataModelAttributes(this.entity)
    }

    // Create a new entity
    async create(data: T): Promise<T> {
        // @ts-ignore
        return await prisma[this.entity].create({data}).catch(err => this.onError(err));
    }

    // Update an entity by id
    async update(id: number, data: T): Promise<T> {
        // @ts-ignore
        return await prisma[this.entity].update({where: {id}, data}).catch(err => this.onError(err));
    }

    // get entity
    async readSingle(id: number, metaData: any, params: any): Promise<T> {
        let selectFields = acquireSelectFields(acquireRequestedGraphqlFields(metaData), this.modelAttributes) || undefined
        // Todo
        // for scenarios where unique id is not {id}
        let whereOverride = {}
        if (params?.notId) {
            whereOverride = {where: {id: undefined, [params.idKey]: id}}
        }
        // @ts-ignore
        return await prisma[this.entity].findUnique({...{where: {id: id}, ...{select: selectFields}, ...whereOverride}}).catch(err => this.onError(err));
    }

    // get entities
    async readMany(filters: Partial<RepositoryFilter>, metaData: any): Promise<T[]> {
        let selectFields = acquireSelectFields(acquireRequestedGraphqlFields(metaData), this.modelAttributes) || undefined
        // @ts-ignore
        return await prisma[this.entity].findMany({...filters, ...{select: selectFields}}).catch(err => this.onError(err));
    }

    // Delete an entity by id
    async delete(id: number): Promise<T> {
        // @ts-ignore
        return await prisma[this.entity].delete({where: {id}}).catch(err => this.onError(err));
    }

    //
    async createEdit(type: CrudOperations, data: T): Promise<T> {
        // @ts-ignore
        if (type == CrudOperations.CREATE) {
            return await this.create(data)
        } else if (type == CrudOperations.UPDATE) {
            // @ts-ignore
            return await this.update(data.id, data)
        } else if (type == CrudOperations.DELETE) {
            // @ts-ignore
            return await this.delete(data.id)
        } else {
            this.onError({message: 'Invalid CrudOperation supplied. Allowed [CREATE, UPDATE, DELETE]'})
            return data
        }

    }

    // return model instance
    clientInstance(entityKey: string): any {
        // @ts-ignore
        return prisma[entityKey]
    }

    // error handler
    onError(payload: any): void {
        throw new GraphQLError(payload.parent || payload.message, {
            extensions: {
                code: 'REPOSITORY_ERROR',
            }
        })
    }
}
