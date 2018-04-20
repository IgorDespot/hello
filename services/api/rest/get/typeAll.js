const { type } = require('lib/orion-module-new');

exports = module.exports = function (req, res, next) {

  let service = req.headers['fiware-service'];
  let service_path = req.headers['fiware-servicepath'];
  
  type.listTypesPromise(service, service_path).then(function (types) {
    res.json(types);
  }).catch((error) => {
    res.json(error);
  });
}