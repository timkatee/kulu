const {Op} = require("sequelize");
let db = require('../../database/models')
let initModels = require('../../database/models/init-models')(db.sequelize)

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
        return initModels[this.modelName].create(this.recordPayload).catch((err) => err);
    }

    //
    async read(mode = 'all') {
        if (mode === 'single') {
            if (!('where' in this.queryOptions)) // useful for update mutations which don't have 'other' wheres
                this.queryOptions.where = {id: this.recordPayload.id}
            return initModels[this.modelName].findOne(this.queryOptions).catch((err) => err);
        } else {
            return initModels[this.modelName].findAll(this.queryOptions).catch((err) => err);
        }
    }

    //
    async update() {
        let item = await this.read('single')
        return item.update(this.recordPayload)
    }

    //
    async delete() {
        return initModels[this.modelName].destroy(this.queryOptions).catch((err) => err);
    }

    //
    async rawQuery(query, options) {
        return db.sequelize.query(query, {model: initModels[this.modelName], ...options}).catch((err) => err)
    }

    // useful for instances where use of the actual sequelize model instance is needed
    modelInstance() {
        return initModels[this.modelName]
    }

}

module.exports = BaseDbModel