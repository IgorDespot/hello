const { entity }    = require('lib/orion-module-new');
const rp            = require('request-promise');
const config        = require('../../../../config.json');
const orionPath     = config['orion-path']

exports = module.exports = function (req, res, next) {

  let service = req.headers['fiware-service'];
  let service_path = req.headers['fiware-servicepath'];

  let options = {
    method: "GET",
    uri: orionPath + 'entities/',
    json: true
  }

  rp(options)
    .then((entities) => {
      res.json(entities)
    })
    .catch((error) => {
      if (error.error['code'] == 'ECONNREFUSED')
        res.status(503).json('There are no server resources to fulfill the client request.')
      else
        res.json(error)
    });

}
