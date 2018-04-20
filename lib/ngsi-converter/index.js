/**
 * @module NgsiConverter
 */

var implementation = require('./ngsi-converter-impl');

/**
 * Return a Promise which states that input data(String)
 * of a supported filetype will be converted to an Array
 * of NGSI compatable objects according to AttributeChecker.
 *
 * For now, the only supported filetypes are: csv, json and xml.
 * There have been plans to implement the .txt converter.
 *
 * csv input example:
 * id;type
 * DepositPointType:0;DepositPointType
 *
 * xml input example:
 * <entities>
 *      <entity>
 *          <id>DepositPoint:0</id>
 *          <type>DepositPoint</type>
 *      </entity>
 *      <entity>
 *          <id>DepositPoint:1</id>
 *          <type>DepositPoint</type>
 *      </entity>
 * </entities>
 *
 * json input example:
 * [
 *      {
 *          "id": "DepositPoint:0",
 *          "type": "DepositPoint"
 *      },
 *      {
 *          "id": "DepositPoint:1",
 *          "type": "DepositPoint"
 *      }
 * ]
 *
 * @method ngsiConverter
 * @param {string} data - string abiding by csv rules
 * @param {string} extension - string representing the extension of the file
 *    like the following: '.csv', '.txt', '.xml', etc.
 * @param {object} [config] - config JS object
 * @returns {Promise}
 */
module.exports = implementation;