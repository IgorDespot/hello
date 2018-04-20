const uploadModule = require('lib/upload-module');
const upload = uploadModule(uploadModule.multer.memoryStorage());
const sucessR = require('../payload').responseSuccess;
const failedR = require('../payload').responseFail;
const rp = require('request-promise');
const config = require('../../../../config.json');
const orionPath = config['orion-path'];
const ngsiConverter = require('lib/ngsi-converter');
const {
  entity
} = require('lib/orion-module-new');
const {
  setOptionsPost
} = require('../setOptions');
const {numOfErrors,numOfSucess,numOfFails} = require('../summary');

exports = module.exports = function (req, res, next) {

  let service = req.headers['fiware-service'];
  let service_path = req.headers['fiware-servicepath'];

  upload(req, res, (err) => {
    console.log(req.files[0].buffer)
    if (err) {
      console.log(err)
      res.status(415).json('Request content type is not supported. Please select .csv file')
    } else if (req.files[0] == undefined) {
      res.status(400).json('The incoming request is invalid in this context. U must select some file')
    } else {
      var data = req.files[0].buffer.toString();
      var extension = uploadModule.getFileExtension(req.files[0]);
      var empty = [];

      ngsiConverter(data, extension)
        .then((data) => {
          var empty = [];
          for (let i = 0; i < data.length; i++) {
            empty.push(rp(setOptionsPost(service, service_path, data[i], orionPath))
              .then((res) => {
                return Promise.resolve(sucessR(data[i], 'CREATE'))
              })
              .catch((err) => {
                if (err.error['errno'] == 'ECONNREFUSED') {
                  res.status(503).json('There are no server resources to fulfill the client request.')
                } else {
                  return Promise.resolve(failedR(data[i], 'CREATE', err.error))
                }
              }))
          }
          Promise.all(empty)
            .then((results) => {
              res.json([{
                "Successfuly created:": numOfSucess(results),
                "Attribute checker errors:": 0,
                "Entity creation errors:": numOfFails(results)
              }, results])
            }).catch((error) => {
              res.json(error)
            })
        }).catch((error) => {
          var fatal = error['err'].toString();
          if (fatal.substring(0, 24) == 'Error: Attribute ruleset') {
            res.status(406).json('Fatal error, entity type must be equal to allowed values DepositPointType,DepositPoint')
          } else {
            var data = error.result;
            var errors = error.err.map((err) => {
              return err.message;
            });
            for (let i = 0; i < data.length; i++) {
              empty.push(rp(setOptionsPost(service, service_path, data[i], orionPath))
                .then((res) => {
                  return Promise.resolve(sucessR(data[i], 'CREATE'))
                })
                .catch((err) => {
                  if (err.error['errno'] == 'ECONNREFUSED') {
                    res.status(503).json('There are no server resources to fulfill the client request.')
                  } else {
                    return Promise.resolve(failedR(data[i], 'CREATE', err.error))
                  }
                }))
            }
            Promise.all(empty)
              .then((results) => {
                res.json([{
                    "Successfuly created:": numOfSucess(results),
                    "Attribute checker errors:": numOfErrors(errors),
                    "Entity creation errors:": numOfFails(results)
                  },
                  errors,
                  results
                ])
              }).catch((error) => {
                res.json(error)
              });
          }
        });
    }
  });
}
