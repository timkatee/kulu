import {
  parseResolveInfo,
  ResolveTree,
  simplifyParsedResolveInfoFragmentWithType,
} from 'graphql-parse-resolve-info';

export const acquireRequestedGraphqlFields = (info: any): string[] => {
  if (info) {
    const parsedInfo = parseResolveInfo(info);
    const { fields } = simplifyParsedResolveInfoFragmentWithType(
      <ResolveTree>parsedInfo,
      info.returnType,
    );
    // remove fields which are not part of model attributes
    return (
      Object.keys(fields)
        // pick the actual type field names as alias might also be passed
        // @ts-ignore
        .map((item) => fields[item]?.name)
    );
  } else {
    return [];
  }
};
