import {prisma} from "@infrastructure/database/prisma/client";
import {Injectable} from '@nestjs/common';
import {Repository, CrudOperations} from "@application/interfaces/repository.interface";
import {RepositoryFilter} from "@application/interfaces/filter.interfaces";
import {GraphQLError} from "graphql";
import {acquireSelectFields} from "@commons/prisma.utilities";
import {acquireRequestedGraphqlFields} from "@commons/graphql.utilities";

@Injectable()
export class RepositoryPrisma<T> implements Repository<T> {
    constructor(private entity: string) {
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
    async readSingle(id: number): Promise<T> {
        // @ts-ignore
        return await prisma[this.entity].findUnique({where: {id: id}}).catch(err => this.onError(err));
    }

    // get entities
    async readMany(filters: Partial<RepositoryFilter>, metaData: any): Promise<T[]> {
        let selectFields = acquireSelectFields(acquireRequestedGraphqlFields(metaData)) || undefined
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

    // error handler
    onError(payload: any): void {
        throw new GraphQLError(payload.parent || payload.message, {
            extensions: {
                code: 'REPOSITORY_ERROR',
            }
        })
    }
}
