const {Op} = require("sequelize");
const BaseDbModel = require('../base/BaseDbModel')
const Utilities = require('./Utilities')


class GraphQLDb extends BaseDbModel {
    constructor(model_name) {
        super(model_name);
    }

    async query(parent, args, context, info, mode) {
        //
        if (mode === 'single') {
            // if where clause is empty try to acquire unique id from args else
            // use the defined where clause from the resolver. Useful for relational resolve fields
            // which use foreign key for single object fetches
            if (!('where' in this.queryOptions)) {
                this.queryOptions['where'] = {
                    id: args.id ? args.id : 0
                }
            }

        } else if (mode === "all") {
            this.queryOptions = {...this.queryOptions, ...Utilities.unquoteJsonObjectProperties(args.seqQueryOptions ? args.seqQueryOptions : {})}
        } else {
            // if no mode is selected, we shall always give nothing
            return
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