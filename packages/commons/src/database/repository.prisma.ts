import { Injectable } from '@nestjs/common';
import {
  Repository,
  CrudOperations,
  ReadModes,
  ModelDefaults,
  RepositoryFilter,
} from '../types';
import { GraphQLError } from 'graphql';
import { acquireRequestedGraphqlFields } from '../utils/graphql.utilities';
import { getDMMF } from '@prisma/internals';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RepositoryPrisma<T extends ModelDefaults>
  implements Repository<T>
{
  modelAttributes?: Record<string, any>;

  constructor(
    private entity: string,
    private configService: ConfigService,
    private prismaClient: any,
  ) {
    this.initialize()
      .then((r) => r)
      .catch((err) => this.onError(err));
  }

  /**
   * Initialize the repository and get the model attributes
   */
  async initialize(): Promise<void> {
    this.modelAttributes = await this.getDataModelAttributes(this.entity);
  }

  /**
   * Create a new entity
   * @param data
   */
  async create(data: T): Promise<T> {
    return this.prismaClient[this.entity]
      .create({ data })
      .catch((err: any) => this.onError(err));
  }

  /**
   * Update an existing entity
   * @param id
   * @param data
   */
  async update(id: number, data: T): Promise<T> {
    return this.prismaClient[this.entity]
      .update({ where: { id }, data })
      .catch((err: any) => this.onError(err));
  }

  /**
   * Get an entity by unique id
   * @param id
   * @param metaData
   * @param params
   * @param mode
   */
  async readSingle(
    id: number | string,
    metaData: any,
    params: any,
    mode: ReadModes,
  ): Promise<T> {
    const selectFields =
      this.acquireSelectFields(
        acquireRequestedGraphqlFields(metaData),
        this.modelAttributes,
      ) || undefined;
    // Todo
    // for scenarios where unique id is not {id}
    let whereOverride = {};
    if (params?.notId) {
      whereOverride = { where: { id: undefined, [params.idKey]: id } };
    }
    // finalized options
    const options = {
      ...{ where: { id: id }, ...{ select: selectFields }, ...whereOverride },
    };
    // to enable choice of prisma optimized findUnique (does not work for same cases returns null)
    if (mode && mode === ReadModes.SINGLE) {
      return this.prismaClient[this.entity]
        .findFirst(options)
        .catch((err: any) => this.onError(err));
    } else {
      return this.prismaClient[this.entity]
        .findUnique({
          ...{
            where: { id: id },
            ...{ select: selectFields },
            ...whereOverride,
          },
        })
        .catch((err: any) => this.onError(err));
    }
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
      this.acquireSelectFields(
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
    return this.prismaClient[this.entity]
      .findMany({ ...filters, ...{ select: selectFields } })
      .catch((err: any) => this.onError(err));
  }

  /**
   * Delete an entity
   * @param id
   */
  async delete(id: number): Promise<T> {
    return this.prismaClient[this.entity]
      .delete({ where: { id } })
      .catch((err: any) => this.onError(err));
  }

  /**
   * Create, Update or Delete an entity
   * @param type
   * @param data
   */
  async createEdit(type: CrudOperations, data: T): Promise<T> {
    if (type == CrudOperations.CREATE) {
      return this.create(data);
    } else if (type == CrudOperations.UPDATE) {
      return this.update(data.id, data);
    } else if (type == CrudOperations.DELETE) {
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
    return this.prismaClient[entityKey];
  }

  // error handler
  onError(payload: any): void {
    throw new GraphQLError(payload.parent || payload.message, {
      extensions: {
        code: 'REPOSITORY_ERROR',
      },
    });
  }

  // helper methods
  async getDataModelAttributes(modelName: string): Promise<any> {
    const dmmf = await getDMMF({
      datamodelPath: this.configService.get('PRISMA_DATA_MODEL_PATH'),
    }).then((r) => r);
    return dmmf.datamodel.models
      .find((model) => model.name === modelName)
      ?.fields.reduce(
        (o, key) => ({
          ...o,
          [key?.name]: key?.name,
        }),
        {},
      );
  }

  acquireSelectFields(fields: string[], modelAttributes: any): any {
    //
    if (fields.length > 0) {
      return fields.reduce((accumulator, value) => {
        if (value in modelAttributes) {
          return { ...accumulator, [value]: true };
        } else {
          return accumulator;
        }
      }, {});
    } else {
      return undefined;
    }
  }
}
