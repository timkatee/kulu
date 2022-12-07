const {Op} = require("sequelize");
let db = require('../../infrastructure/databases/sequelize/models')
let initModels = require('../../infrastructure/databases/sequelize/models/init-models')(db.sequelize)
const {GraphQLError} = require('graphql');


class BaseDbModel {
    //
    modelName = ""
    modelAttributes = {}
    queryOptions = {limit: 25}
    recordPayload = {id: null}

    //
    constructor(model_name) {
        this.modelName = model_name
        this.modelAttributes = this.modelInstance().getAttributes
    }

    //
    async create() {
        return initModels[this.modelName].create(this.recordPayload).catch((err) => {
            this.errorhandler(err)
        });
    }

    //
    async read(mode = 'all') {
        if (mode === 'single') {
            if (!('where' in this.queryOptions)) // useful for update mutations which don't have 'other' wheres
                this.queryOptions.where = {id: this.recordPayload.id}
            return initModels[this.modelName].findOne(this.queryOptions).catch((err) => {
                this.errorhandler(err)
            });
        } else {
            return initModels[this.modelName].findAll(this.queryOptions).catch((err) => {
                this.errorhandler(err)
            });
        }
    }

    //
    async update() {
        let item = await this.read('single')
        return item.update(this.recordPayload).catch((err) => {
            this.errorhandler(err)
        });
    }

    //
    async delete() {
        return initModels[this.modelName].destroy(this.queryOptions).catch((err) => {
            this.errorhandler(err)
        });
    }

    //
    async rawQuery(query, options) {
        return db.sequelize.query(query, {model: initModels[this.modelName], ...options}).catch((err) => {
            this.errorhandler(err)
        })
    }

    // useful for instances where use of the actual sequelize model instance is needed
    modelInstance(modelName = undefined) {
        return initModels[modelName ? modelName : this.modelName]
    }

    // error
    errorhandler = (err) => {
        throw new GraphQLError(err.parent || err.message, {
            extensions: {
                code: 'SEQUELIZE_ERROR',
            },
        });
    }

}

module.exports = BaseDbModel