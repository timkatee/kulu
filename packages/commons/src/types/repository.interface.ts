import { RepositoryFilter } from './filter.interfaces';
import { registerEnumType } from '@nestjs/graphql';

export enum CrudOperations {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export enum ReadModes {
  SINGLE = 'SINGLE',
  BATCH = 'BATCH',
}

registerEnumType(CrudOperations, { name: 'CrudOperations' });

export interface ModelDefaults {
  id: number;
}

export interface Repository<Model> {
  initialize?(): Promise<void>;

  create(data: Model): Promise<Model>;

  update(id: number, data: Partial<Model>): Promise<Model>;

  readSingle(
    id: number | string,
    metaData?: any,
    params?: any,
    mode?: ReadModes,
  ): Promise<Model>;

  readMany(
    filters: Partial<RepositoryFilter>,
    metaData?: any,
  ): Promise<Model[]>;

  delete(id: number): Promise<Model>;

  createEdit(type: CrudOperations, data: Partial<Model>): Promise<Model>;

  clientInstance?(entityKey: string): any;

  onError?(payload: any): void;
}
