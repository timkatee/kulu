const { Op } = require("sequelize");
const BaseDbModel = require('../base/BaseDbModel')

class GraphQLDb extends BaseDbModel {
    constructor(model_name) {
        super(model_name);
    }

    async query(parent, args, context, info, mode) {
        //
        if (mode === 'single') {
            this.queryOptions['where'] = {
                id: args.id ? args.id : 0
            }
        }else{
            this.queryOptions = args.seqQueryOptions ? args.seqQueryOptions : {}
        }
        // sanitize
        console.log(this.queryOptions)
        this.sanitizeQueryOptions()
        console.log(this.queryOptions)
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

    /***
     * Helper functions
     */
    sanitizeQueryOptions(){
        // convert to javascript object to expose operators
        this.queryOptions = this.toJsonObject(this.queryOptions)
    }

    toJsonObject(jsonString){
        try{
            return JSON.parse(JSON.stringify(this.queryOptions), (key, value)=>{
                if(key.contains('Op')){
                    return;
                }
                return value
            })
        }catch (e) {
            console.log(e.message)
            return jsonString
        }
    }
}

module.exports = GraphQLDb