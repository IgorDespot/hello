/**
 * This is response payload for successful creation/update of entities from file
 * @param {Object} entity - Entity used for payload response it take id and type from it 
 */
function success(entity) {
    return {
        "status":[{
            "type": entity.type,
             "description":{
                 "id": entity.id
             },
             "actions":[{
                 "error": '',
                 "status": "SUCCESS",
                 "type": "CREATE"
             }]
        }]
     }
}

/**
 * This is response payload for failed creation/update of entities from file
 * @param {Object} entity - Entity used for payload response it take id and type from it 
 */
function fail(response, entity) {
   
}

/** Exports for use in other part of programing */
exports = module.exports = {
    success,
    fail
}