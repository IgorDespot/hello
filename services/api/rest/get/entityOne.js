const { entity }    = require('lib/orion-module-new');
const rp            = require('request-promise');
const config        = require('../../../../config.json');
const orionPath     = config['orion-path']

exports = module.exports = function (req, res, next) {

  let service = req.headers['fiware-service'];
  let service_path = req.headers['fiware-servicepath'];
  let entity_id = req.params.id;

  let options = {
    method: "GET",
    uri: orionPath + 'entities/' + entity_id,
    headers: {
      "Fiware-Service": service,
      "Fiware-ServicePath": service_path
    },
    json: true
  }

  rp(options)
    .then((entity) => {
      res.json(entity)
    })
    .catch((error) => {
     if(error.statusCode === 404) {
       res.status(404).json('The resource (entity, subscription, etc.) referred in the request has not been found')
     } else if (error.error['code'] == 'ECONNREFUSED') {
      res.status(503).json('There are no server resources to fulfill the client request.')
     } else {
       res.json(error)
     }

    });
}
