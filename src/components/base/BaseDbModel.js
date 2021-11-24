const {Op} = require("sequelize");
let db = require('../../database/models')

class BaseDbModel {
    //
    modelName = ""
    queryOptions = {limit: 25}
    recordPayload = {id: null}

    //
    constructor(model_name) {
        this.modelName = model_name
    }

    //
    async create() {
        return db[this.modelName].create(this.recordPayload).catch((err) => err);
    }

    //
    async read(mode = 'all') {
        if (mode === 'single') {
            if (!('where' in this.queryOptions)) // useful for update mutations which don't have 'other' wheres
                this.queryOptions.where = {id: this.recordPayload.id}
            return db[this.modelName].findOne(this.queryOptions).catch((err) => err);
        } else {
            return db[this.modelName].findAll(this.queryOptions).catch((err) => err);
        }
    }

    //
    async update() {
        let item = await this.read('single')
        return item.update(this.recordPayload)
    }

    //
    async delete() {
        return db[this.modelName].destroy(this.queryOptions).catch((err) => err);
    }

    //
    async rawQuery(query, options) {
        return db.sequelize.query(query, {model: db[this.modelName], ...options}).catch((err) => err)
    }

    // useful for instances where use of the actual sequelize model instance is needed
    modelInstance() {
        return db[this.modelName]
    }

}

module.exports = BaseDbModel