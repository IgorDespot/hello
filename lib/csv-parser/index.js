/**
 * Csv parser module.
 * @module lib/csv-parser
 */

let parse = require('csv-parse');

/**
 * Parse string.
 * @method parse
 * @param {string} data
 * @param callback
 * @param {object} [options]
 */
let parseFunc = exports.parse = function (data, callback, options) {
    options = options || {};
    options.columns = true;
    parse(data, options, callback);
}

/**
 * Return Promise which parses string.
 * @method parsePromise
 * @param {string} data
 * @param {object} [options]
 */
exports.parsePromise = function (data, options) {
    return new Promise(
        function(resolve, reject) {
            parseFunc(data, (err, out) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(out);
                }
            }, options);
        }
    );
};
