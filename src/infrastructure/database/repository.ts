import {prisma} from "@infrastructure/database/prisma/client";
import {Injectable} from '@nestjs/common';
import {IRepository, ReadModes, CrudOperations} from "@application/interfaces/repository.interface";
import {IRepositoryFilter} from "@application/interfaces/filter.interfaces";
import {GraphQLError} from "graphql";

@Injectable()
export class Repository<T> implements IRepository<T> {
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

    // get entity or entities
    async read(mode: ReadModes, filters: Partial<IRepositoryFilter>): Promise<T | T[]> {
        if (mode === ReadModes.SINGLE) {
            // @ts-ignore
            return await prisma[this.entity].findUnique(filters).catch(err => this.onError(err));
        }
        // @ts-ignore
        return await prisma[this.entity].findMany(filters).catch(err => this.onError(err));
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
