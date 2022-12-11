const {Op} = require("sequelize");
const db = require('../../infrastructure/database/sequelize/models')
const {parseResolveInfo, simplifyParsedResolveInfoFragmentWithType} = require("graphql-parse-resolve-info");

const BaseDbModel = require('../base/BaseDbModel')
const Utilities = require('./Utilities')


class GraphQLDb extends BaseDbModel {
    constructor(model_name) {
        super(model_name);
    }

    #sanitizeQueryFields(info){
        // support for __resolveReference to be added later for subgraph fields
        if(info) {
            const parsedInfo = parseResolveInfo(info)
            const {fields} = simplifyParsedResolveInfoFragmentWithType(parsedInfo, info.returnType)
            const acquiredFields = Object.keys(fields)
                // pick the actual type field names as alias might also be passed
                .map((item) => fields[item]?.name)
                // remove fields which are not part of model attributes
                .filter((item) => Object.keys(this.modelInstance().getAttributes()).includes(item))
            if (acquiredFields && acquiredFields instanceof Array && acquiredFields.length > 0) {
                this.queryOptions = {...this.queryOptions, ...{attributes: acquiredFields}}
            }
        }
    }

    async query(parent, args, context, info, mode) {
        // inject only required fields into query attributes.
        // validate if the fields are model attributes
        this.#sanitizeQueryFields(info)
        //
        if (mode === 'single') {
            // if where clause is empty try to acquire unique id from args else
            // use the defined where clause from the resolver.
            // Useful for relational resolve fields which use foreign key for single object fetches
            if (!('where' in this.queryOptions)) {
                // enable publish=1 by default unless overridden
                let publish = args?.ignore_publish ? {} : {publish: 1}
                this.queryOptions['where'] = {
                    id: args.id ? args.id : 0,
                    ...publish
                }
            }
            // update limit to 1
            this.queryOptions = {...this.queryOptions, ...{limit: 1}}

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