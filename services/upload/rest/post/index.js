let uploadModule = require('lib/upload-module');
let upload = uploadModule(uploadModule.multer.memoryStorage());

var ngsiConverter = require('lib/ngsi-converter');

const create = require('lib/orion-module-new').createEntity;

// Check different errors and handle displaying them to user
exports = module.exports = function (req, res, next) {
    upload(req, res, (err) => {
        if (err) {
            res.render('upload', {
                msg: err
            });
        } else if (req.file == undefined) {
            res.render('upload', {
                msg: 'Error: No file selected!'
            });
        } else {
            // Parse data then it send it to orion contex broker
            var data = req.file.buffer.toString();
            var extension = uploadModule.getFileExtension(req.file);
            ngsiConverter(data, extension)
            .then(
                (data) => {
                    var promises = [];
                    data.forEach((curr, index) => {
                        promises[index] = Promise.resolve(curr)
                        .then((obj) => {
                            return create(obj);
                        })
                    });
                    return Promise.all(promises);
                }
            ).then(() => {
                res.render('upload', {
                    msg: 'Succes everything went fine.'
                });
            })
            .catch((err) => 
                res.render('upload', {
                    msg: err
                })
            );               
        }
    });
}