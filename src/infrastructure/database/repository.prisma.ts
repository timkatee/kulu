import { prisma, PrismaClient } from '@infrastructure/database/prisma/client';
import { Injectable } from '@nestjs/common';
import {
  Repository,
  CrudOperations,
} from '@application/interfaces/repository.interface';
import { RepositoryFilter } from '@application/interfaces/filter.interfaces';
import { GraphQLError } from 'graphql';
import {
  acquireSelectFields,
  getDataModelAttributes,
} from '@commons/prisma.utilities';
import { acquireRequestedGraphqlFields } from '@commons/graphql.utilities';

@Injectable()
export class RepositoryPrisma<T> implements Repository<T> {
  modelAttributes?: {};

  constructor(private entity: string) {
    this.initialize()
        .then((r) => r)
        .catch((err) => this.onError(err));
  }

  /**
   * Initialize the repository and get the model attributes
   */
  async initialize(): Promise<void> {
    this.modelAttributes = await getDataModelAttributes(this.entity);
  }

  /**
   * Create a new entity
   * @param data
   */
  async create(data: T): Promise<T> {
    // @ts-ignore
    return prisma[this.entity]
        .create({ data })
        .catch((err:any) => this.onError(err));
  }

  /**
   * Update an existing entity
   * @param id
   * @param data
   */
  async update(id: number, data: T): Promise<T> {
    // @ts-ignore
    return prisma[this.entity]
        .update({ where: { id }, data })
        .catch((err:any) => this.onError(err));
  }

  /**
   * Get an entity by unique id
   * @param id
   * @param metaData
   * @param params
   */
  async readSingle(
      id: number | string,
      metaData: any,
      params: any,
  ): Promise<T> {
    const selectFields =
        acquireSelectFields(
            acquireRequestedGraphqlFields(metaData),
            this.modelAttributes,
        ) || undefined;
    // Todo
    // for scenarios where unique id is not {id}
    let whereOverride = {};
    if (params?.notId) {
      whereOverride = { where: { id: undefined, [params.idKey]: id } };
    }
    // @ts-ignore
    return prisma[this.entity]
        .findUnique({
          ...{ where: { id: id }, ...{ select: selectFields }, ...whereOverride },
        })
        .catch((err:any) => this.onError(err));
  }

  /**
   * Get many entities
   * @param filters
   * @param metaData
   */
  async readMany(
      filters: Partial<RepositoryFilter>,
      metaData: any,
  ): Promise<T[]> {
    const selectFields =
        acquireSelectFields(
            acquireRequestedGraphqlFields(metaData),
            this.modelAttributes,
        ) || undefined;
    // option to read all and override take
    try {
      if (!filters.all && filters.all == false) {
        // filters.take = 25
      } else {
        filters.take = undefined;
      }
      delete filters?.all;
    } catch (e) {
      this.onError(e);
    }
    // @ts-ignore
    return prisma[this.entity]
        .findMany({ ...filters, ...{ select: selectFields } })
        .catch((err:any) => this.onError(err));
  }

  /**
   * Delete an entity
   * @param id
   */
  async delete(id: number): Promise<T> {
    // @ts-ignore
    return prisma[this.entity]
        .delete({ where: { id } })
        .catch((err:any) => this.onError(err));
  }

  /**
   * Create, Update or Delete an entity
   * @param type
   * @param data
   */
  async createEdit(type: CrudOperations, data: T): Promise<T> {
    // @ts-ignore
    if (type == CrudOperations.CREATE) {
      return this.create(data);
    } else if (type == CrudOperations.UPDATE) {
      // @ts-ignore
      return this.update(data.id, data);
    } else if (type == CrudOperations.DELETE) {
      // @ts-ignore
      return this.delete(data.id);
    } else {
      this.onError({
        message:
            'Invalid CrudOperation supplied. Allowed [CREATE, UPDATE, DELETE]',
      });
      return data;
    }
  }

  // return model instance
  clientInstance(entityKey: string): any {
    // @ts-ignore
    return prisma[entityKey];
  }

  // error handler
  onError(payload: any): void {
    throw new GraphQLError(payload.parent || payload.message, {
      extensions: {
        code: 'REPOSITORY_ERROR',
      },
    });
  }
}
