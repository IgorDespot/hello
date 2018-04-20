const { type }    = require('lib/orion-module-new');

exports = module.exports = function (req, res, next) {

  let service = req.headers['fiware-service'];
  let service_path = req.headers['fiware-servicepath'];
  let type_id = req.params.id;

  type.listSingleTypePromise(service, service_path, type_id).then(function (type) {
    res.json(type)
  }).catch((error) => {
    res.json(error)
  });
}