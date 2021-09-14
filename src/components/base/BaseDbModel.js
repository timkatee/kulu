const {Op} = require("sequelize");
let db = require('../../database/models')

class BaseDbModel{
    //
    modelName = ""
    queryOptions = {}
    recordPayload = {}
    //
    constructor(model_name) {
        this.modelName = model_name
    }
    //
    async create(){
        return db[this.modelName].create(this.recordPayload).catch((err) => err);
    }
    //
    async read(mode='all'){
        if(mode === 'single') {
            return db[this.modelName].findOne(this.queryOptions).catch((err) => err);
        }else{
            return db[this.modelName].findAll(this.queryOptions).catch((err) => err);
        }
    }
    //
    async update(){
        let item = await this.read('single')
        return item.update(this.recordPayload)
    }
    //
    async delete(){
        return db[this.modelName].destroy(this.queryOptions).catch((err) => err);
    }

}

module.exports = BaseDbModel