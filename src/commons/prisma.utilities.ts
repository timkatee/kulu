import {getDMMF} from "@prisma/internals";

export const getDataModelAttributes = async (modelName: string) => {
    let dmmf = await getDMMF({datamodelPath: process.env.PRISMA_DATA_MODEL_PATH}).then((r) => r)
    return dmmf.datamodel.models.find(model => model.name === modelName)?.fields.reduce((o, key) => ({
        ...o,
        [key?.name]: key?.name
    }), {})
}

export const acquireSelectFields = (fields: string[], modelAttributes: any): any => {
    //
    if (fields.length > 0) {
        return fields.reduce((accumulator, value) => {
            if (value in modelAttributes) {
                return {...accumulator, [value]: true};
            } else {
                return accumulator;
            }
        }, {});
    } else {
        return undefined
    }
}
