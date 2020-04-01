export function createdBy(object){
    const {createdBy, ...newObject} = object;
    return Object.assign(newObject, {createdBy: object['createdBy']['email']});
}