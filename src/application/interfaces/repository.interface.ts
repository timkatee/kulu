import {RepositoryFilter} from "@application/interfaces/filter.interfaces";
import {registerEnumType} from "@nestjs/graphql";

export enum CrudOperations {
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE'
}

registerEnumType(CrudOperations, {name: 'CrudOperations'})

export interface Repository<Model> {
    create(data: Model): Promise<Model>

    update(id: number, data: Partial<Model>): Promise<Model>

    readSingle(id: number, metaData?: any): Promise<Model>

    readMany(filters: Partial<RepositoryFilter>, metaData?: any): Promise<Model[]>

    delete(id: number): Promise<Model>

    createEdit(type: CrudOperations, data: Partial<Model>): Promise<Model>

    onError?(payload: any): void
}