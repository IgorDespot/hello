const uploadModule    = require('lib/upload-module');
const upload          = uploadModule(uploadModule.multer.memoryStorage());
const sucessR         = require('../payload').responseSuccess;
const failedR         = require('../payload').responseFail;
const rp              = require('request-promise');
const config          = require('../../../../config.json');
const orionPath       = config['orion-path'];
const ngsiConverter   = require('lib/ngsi-converter');
const {setOptionsPatch}= require('../setOptions');

exports = module.exports = function (req, res, next) {

  let service = req.headers['fiware-service'];
  let service_path = req.headers['fiware-servicepath'];

  upload(req, res, (err) => {
    if (err) {
      res.json(err)
    } else if (req.files == undefined) {
      res.json('Please select file.')
    } else {
      var data = req.files[0].buffer.toString();
      var extension = uploadModule.getFileExtension(req.files[0]);
      var empty = [];

      var conf = require('config.json')['ngsi-converter'];
      conf["attribute-checker-options"]["strictEntityCheck"] = false;
      conf["attribute-checker-options"]['strictAttributeImposterCheck'] = true;
      ngsiConverter(data, extension, conf)
        .then((data) => {
          var empty = [];
          for (let i = 0; i < data.length; i++) {
            empty.push(rp(setOptionsPatch(service,service_path,data[i],orionPath))
             .then((res) => {
               return Promise.resolve(sucessR(data[i], 'UPDATE'))
             })
             .catch((err) => {
               if (err.error['errno'] == 'ECONNREFUSED') {
                 res.status(503).json('There are no server resources to fulfill the client request.')
              } else {
                 return Promise.resolve(failedR(data[i], 'UPDATE', err.error))
              }
             }))
          }
          Promise.all(empty)
            .then((results) => {
              res.json([{
                "Successfuly updated:": numOfSuccess(results),
                "Attribute checker errors:": 0,
                "Entity updating errors": numOfFails(results)
              }, results])
            }).catch((error) => {
              res.json(error)
            })
        }).catch((error) => {
          console.log(error['err'])
          var data = error.result;
          var errors = error.err.map((err) => {
              return err.message;
          });
          for (let i = 0; i < data.length; i++) {
            empty.push(rp(setOptionsPatch(service,service_path,data[i],orionPath))
             .then((res) => {
               return Promise.resolve(sucessR(data[i], 'UPDATE'))
             })
             .catch((err) => {
               if (err.error['errno'] == 'ECONNREFUSED') {
                 res.status(503).json('There are no server resources to fulfill the client request.')
              } else {
                 return Promise.resolve(failedR(data[i], 'UPDATE', err.error))
              }
             }))
          }
          Promise.all(empty)
            .then((results) => {
              res.json([{
                "Successfuly updated:": numOfSuccess(results),
                "Attribute checker errors:": sizeObj(errors),
                "Entity updating errors": numOfFails(results)
              },
              errors,
              results
            ])
            }).catch((error) => {
              res.json(error)
            });
        });
    }
  });
}

function sizeObj(obj) {
    return Object.keys(obj).length;
}

function test(obj) {
    var fail = [];
    obj.forEach(element => {
        fail.push(payload.success(element));
    })
    return fail;
}

function numOfFails(msg) {
    var fails = [];
    msg.forEach(igor => {
        igor.status.forEach(despot => {
            despot.actions.forEach(element => {
                if (element.status === 'FAIL')
                    fails.push(element.status)
            });
        });
    })
    return fails.length;
}

function numOfSuccess(msg) {
    var success = [];
    msg.forEach(igor => {
        igor.status.forEach(despot => {
            despot.actions.forEach(element => {
                if (element.status === 'SUCCESS')
                    success.push(element.status)
            });
        });
    })
    return success.length;
}
