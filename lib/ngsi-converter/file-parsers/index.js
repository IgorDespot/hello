var csvParser = require('lib/csv-parser');
var xmlParser = require('lib/xml-parser');
var JSONParser = require('lib/json-parser');

module.exports = {
    ".csv": csvParser.parsePromise,
    ".xml": xmlParser.parsePromise,
    ".json": JSONParser.parsePromise,
    ".txt": notImplementedYet
}

function notImplementedYet(data, ext) {
    return Promise.reject(
        `Parser for ${ext} filetype hasn't been implemented yet`
    );
}