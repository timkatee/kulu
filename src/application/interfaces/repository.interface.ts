import {RepositoryFilter} from "@application/interfaces/filter.interfaces";
import {registerEnumType} from "@nestjs/graphql";

export enum CrudOperations {
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE'
}

registerEnumType(CrudOperations, {name: 'CrudOperations'})

export interface Repository<Model> {

    initialize?(): Promise<void>

    create(data: Model): Promise<Model>

    update(id: number, data: Partial<Model>): Promise<Model>

    readSingle(id: number, metaData?: any, model?: Model): Promise<Model>

    readMany(filters: Partial<RepositoryFilter>, metaData?: any, model?: Model): Promise<Model[]>

    delete(id: number): Promise<Model>

    createEdit(type: CrudOperations, data: Partial<Model>): Promise<Model>

    clientInstance?(entityKey: string): any

    onError?(payload: any): void
}