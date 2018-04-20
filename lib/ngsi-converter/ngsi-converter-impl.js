/**
 * Ngsi converter module
 * @module lib/ngsi-converter
 */
var attrParser = require('lib/attribute-checker');
var defaultConfig = require('config.json')['ngsi-converter'];
var fileParsers = require('./file-parsers');

var ngsiConverter = function (data, extension, config) {
    var ngsiConfig = getConfig(config);
    var parsePromise = undefined;
    var fileParserSupportsExtension = fileParsers.hasOwnProperty(extension);
    if (fileParserSupportsExtension) {
        let parse = fileParsers[extension];
        parsedPromise = parse(data, ngsiConfig.parseOptions[extension]);
    } else {
        parsedPromise = Promise.reject(`
            Conversion for ${extension} extension isn't supported
        `);
    }
    return parsedPromise.then(
        (parsedData) => {
            return attrParser.promise(
                parsedData,
                ngsiConfig.attributeCheckerOptions
            );
        }
    );
}

function getConfig(config) {
    var ngsiConfig = config || defaultConfig;
    if (!ngsiConfig) {
        throw new Error(
            "config object hasn't been provided nore has config.json been found"
        );
    }
    var parseOptions = ngsiConfig["parse-options"];
    if (!parseOptions) {
        throw new Error(
            "parse-options property has not been found in config object"
        );
    }
    var attributeCheckerOptions = ngsiConfig["attribute-checker-options"];
    if (!attributeCheckerOptions) {
        throw new Error(
            "attribute-checker-options property has not been found in config object"
        );
    }
    return {
        parseOptions,
        attributeCheckerOptions
    }
}

/**
 * @method ngsiConverter
 * @param {string} data - string abiding by csv rules
 * @param {string} extension - string representing the extension of the file
 *    like the following: '.csv', '.txt', '.xml', etc.
 * @param {object} [config] - config JS object
 * @returns {Promise}
 */
module.exports = ngsiConverter;