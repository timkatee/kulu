import {prisma} from "@infrastructure/database/prisma/client";
import { Injectable } from '@nestjs/common';

@Injectable()
export class Repository<T> {
    constructor(private entity: string) {}

    // Create a new entity
    async create(data: T): Promise<T> {
        // @ts-ignore
        return await prisma[this.entity].create({ data });
    }

    // Find all entities that match the given filters
    async findAll(filters?: Partial<T>): Promise<T[]> {
        // If no filters are provided, return all entities
        if (!filters) {
            // @ts-ignore
            return await prisma[this.entity].findMany();
        }

        // Otherwise, use the filters to find matching entities
        // @ts-ignore
        return await prisma[this.entity].findMany({ where: filters });
    }

    // Find an entity by id
    async findById(id: number): Promise<T> {
        // @ts-ignore
        return await prisma[this.entity].findOne({ where: { id } });
    }

    // Update an entity by id
    async update(id: number, data: T): Promise<T> {
        // @ts-ignore
        return await prisma[this.entity].update({ where: { id }, data });
    }

    // Delete an entity by id
    async delete(id: number): Promise<T> {
        // @ts-ignore
        return await prisma[this.entity].delete({ where: { id } });
    }
}

export default Repository;

