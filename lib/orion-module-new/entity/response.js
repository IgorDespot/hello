function responseSuccess(entity,action) {
  return {
      "status":[{
          "type": entity.type ? entity.type : "Unknown",
           "description":{
               "id": entity.id ? entity.id : "Unknown"
           },
           "actions":[{
               "error": "",
               "status": 'SUCCESS',
               "type": action
           }]
      }]
   }
 }

 function responseFail(entity,action, error) {
   return {
       "status":[{
           "type": entity.type ? entity.type : "Unknown",
            "description":{
                "id": entity.id ? entity.id : "Unknown"
            },
            "actions":[{
                "error": error ? error : "",
                "status": 'FAIL',
                "type": action
            }]
       }]
    }
  }

exports = module.exports = {
  responseSuccess,
  responseFail
}
