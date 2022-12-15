export const acquireSelectFields = (fields: string[]): any => {
    return fields.reduce((accumulator, value) => {
        return {...accumulator, [value]: true};
    }, {});
}