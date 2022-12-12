import {IRepositoryFilter} from "@application/interfaces/filter.interfaces";
import {registerEnumType} from "@nestjs/graphql";

export enum ReadModes {
    'ALL' = 'ALL',
    'SINGLE' = 'SINGLE'
}

export enum CrudOperations {
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE'
}

registerEnumType(CrudOperations, {name: 'CrudOperations'})

export interface IRepository<Model> {
    create(data: Model): Promise<Model>

    update(id: number, data: Partial<Model>): Promise<Model>

    read(mode: ReadModes, filters: Partial<IRepositoryFilter>): Promise<Model | Model[]>

    delete(id: number): Promise<Model>

    createEdit(type: CrudOperations, data: Partial<Model>): Promise<Model>

    onError?(payload: any): void
}