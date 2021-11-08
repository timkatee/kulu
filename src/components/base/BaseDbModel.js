const {Op} = require("sequelize");
let db = require('../../database/models')

class BaseDbModel {
    //
    modelName = ""
    queryOptions = {}
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
            if (Object.keys(this.queryOptions).length === 0) // useful for update mutations which don't have 'other' wheres
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

}

module.exports = BaseDbModel