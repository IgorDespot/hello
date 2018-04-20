var parseString = require('xml2js').parseString;

var parseSettings = {
    explicitRoot: false,
    explicitArray: false
}

var adaptResult = (oldResult) => {
    var newResult = oldResult['entity'];
    if ( !(newResult instanceof Array) ) {
        newResult = [newResult];
    }
    return newResult;
}

function parsePromise(data) {
    return new Promise(
        function (resolve, reject) {
            parseString(
                data,
                parseSettings,
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(
                            adaptResult(result)
                        );
                    }
                }
            );
        }
    );
}

exports.parsePromise = parsePromise;