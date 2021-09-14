const BaseDbModel = require('../base/BaseDbModel')

class GraphQLDb extends BaseDbModel {
    constructor(model_name) {
        super(model_name);
    }

    async query(parent, args, context, info, mode) {
        if (mode === 'single') {
            this.queryOptions['where'] = {
                id: args.id ? args.id : 0
            }
        }else{
            this.queryOptions = args.seqQueryOptions ? args.seqQueryOptions : {}
        }
        //
        console.log(await this.read(mode))
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