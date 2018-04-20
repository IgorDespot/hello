/**
 * Csv file parser module.
 * @module lib/csv-file-parser
 */

var csvParser = require('lib/csv-parser');
var fs = require('fs');

/**
 * Parses data from file
 * @method parse
 * @param {string} file - Path to file.
 * @param callback
 * @param {object} [options]
 */
let parseFunc = exports.parse = function (file, callback, options) {
    fs.readFile(file, 'utf-8' , function (err, data) {
        csvParser.parse(data, callback, options);
    });
}

/**
 * Return Promise which parses file.
 * @method parsePromise
 * @param {string} file - Path to file.
 * @param {object} [options]
 */
exports.parsePromise = function (file, options) {
    return new Promise(
        function(resolve, reject) {
            parseFunc(file, (err, out) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(out);
                }
            }, options);
        }
    );
};