import {parseResolveInfo, ResolveTree, simplifyParsedResolveInfoFragmentWithType} from "graphql-parse-resolve-info"

export const acquireRequestedGraphqlFields = (info: any): string[] => {
    if (info) {
        const parsedInfo = parseResolveInfo(info)
        const {fields} = simplifyParsedResolveInfoFragmentWithType(<ResolveTree>parsedInfo, info.returnType)
        const acquiredFields = Object.keys(fields)
            // pick the actual type field names as alias might also be passed
            // @ts-ignore
            .map((item) => fields[item]?.name)
            // remove fields which are not part of model attributes
        if (acquiredFields && acquiredFields instanceof Array && acquiredFields.length > 0) {
            return acquiredFields
        } else {
            return []
        }
    } else {
        return []
    }
}