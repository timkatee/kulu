const { Op } = require("sequelize");
const BaseDbModel = require('../base/BaseDbModel')
const Utilities = require('./Utilities')


class GraphQLDb extends BaseDbModel {
    constructor(model_name) {
        super(model_name);
    }

    async query(parent, args, context, info, mode) {
        //
        if (mode === 'single' && Object.keys(this.queryOptions).length === 0) {
            this.queryOptions['where'] = {
                id: args.id ? args.id : 0
            }
        }else{
            this.queryOptions = Utilities.unquoteJsonObjectProperties(args.seqQueryOptions ? args.seqQueryOptions : {})
        }
        //
        return await this.read(mode)
    }

    async mutation(type = "UPDATE") {
        switch (type) {
            case "CREATE":
                return await this.create()
            case "UPDATE":
                return await this.update()
            case "DELETE":
                return await this.delete()
            default:
                return {message: 'No mutation action specified!'}
        }
    }
}

module.exports = GraphQLDb