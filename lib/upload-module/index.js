let multer = require('multer');
let path = require('path');
let extf = require('../../config.json');
const fileExtentions = extf['file-extentions'];

/** Define storage location and format of file that is being saved */
let defaultStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, 'File' + file.originalname);
    }
});

/** Checking that file have right extenstion
 * @param {Request} file from upload form
 */
 function checkFileType(file, cb) {
    var ext = path.extname(file.originalname);
    if (fileExtentions.includes(ext)) {
        return cb(null, true);
    } else {
        cb('Error: Csv Only!');
    }
}

function getFileExtension(file) {
    return path.extname(file.originalname);
}

/**
 * @param {Function} storage - setting memory storage if params is not provided local one will be used
 * @param {String} filename - name of file where data will be written
*/
module.exports = function (storage) {
    storage = storage || defaultStorage;
    return multer({
        storage: storage,
        fileFilter: function(req, file, cb) {
            checkFileType(file, cb);
        }
    }).any();
};

/** Module.exports multer in case we need to change storage options in other files. */
module.exports.multer = multer;

/**
 * @param {File} file Take file and check for extentions
 */
module.exports.fileFilter =  function (file, cb) {
     return checkFileType(file, cb);
}

/**
 * @param {File} file Take file and get extention
 */
module.exports.getFileExtension =  getFileExtension;
