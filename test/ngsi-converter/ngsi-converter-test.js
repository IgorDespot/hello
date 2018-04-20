var ngsiConverter = require('lib/ngsi-converter');
var fs = require('fs');

var options = {
    "parse-options": {
        ".csv": {
            "delimiter": ";"
        }
    },
    "attribute-checker-options": {
        "strictEntityCheck": false,
        "strictEntityPropertyCheck": false
    }
}

describe('ngsi-converter', function () {

    it(`
        returns a rejected promise when no arguments are provided
    `, function () {
        expect(ngsiConverter().catch(Object)).toEqual(jasmine.any(Promise));
    });

    it(`
        returns an ngsi compatable JS object from
        valid csv input
    `, function (done) {
        fs.readFile(
            './test/ngsi-converter/test-3.csv',
            'utf-8',
            function (err, data) {
                ngsiConverter(data, '.csv', options)
                .then( function (data) {
                    expect(data).toEqual(jasmine.any(Array));
                    done();
                })
                .catch(function (data) {
                    done.fail("This shouldn't happen");
                });
            }
        );
    });

    it(`
        Should fail for invalid csv input on strict check
    `, function (done) {
        var strictOptions = Object.assign({}, options);
        strictOptions["attribute-checker-options"] = {
            "strictEntityCheck": true,
            "strictEntityPropertyCheck": false
        };
        fs.readFile(
            './test/ngsi-converter/test-err.csv',
            'utf-8',
            function (err, data) {
                ngsiConverter(data, '.csv', strictOptions)
                .then( function (data) {
                    done.fail("This shouldn't happen");
                })
                .catch(function (data) {
                    done();
                });
            }
        );
    });

    xit(`
        returns an ngsi compatable JS object
        from valid xml input
    `, function (done) {
        fs.readFile(
            './test/ngsi-converter/test.xml',
            'utf-8',
            function (err, data) {
                ngsiConverter(data, '.xml', options)
                .then( function (data) {
                    expect(data).toEqual(jasmine.any(Array));
                    done();
                })
                .catch(function (data) {
                    done.fail("This shouldn't happen");
                });
            }
        );
    });

    xit(`
        returns an ngsi compatable JS object
        from valid json input
    `, function (done) {
        fs.readFile(
            './test/ngsi-converter/test.json',
            'utf-8',
            function (err, data) {
                ngsiConverter(data, '.json', options)
                .then(function (data) {
                    expect(data).toEqual(jasmine.any(Array));
                    done();
                })
                .catch(function (data) {
                    done.fail("This shouldn't happen");
                });
            }
        );
    });

    it(`
        fails on strictEntityCheck if any property has null
        or undefined values within an entity
    `, function (done) {
        var strictOptions = Object.assign({}, options);
        strictOptions["attribute-checker-options"] = {
            "strictEntityCheck": true,
            "strictEntityPropertyCheck": false
        };
        fs.readFile(
            './test/ngsi-converter/test.json',
            'utf-8',
            function (err, data) {
                ngsiConverter(data, '.json', strictOptions)
                .then(function (data) {
                    done.fail("Shouldn't happen");
                })
                .catch(function (data) {
                    done();
                });
            }
        );
    });

    it(`
        fails if extension isn't supported
    `, function (done) {
        ngsiConverter('gibberish', '.unsupported')
        .then((x) => {
            done.fail("This shouldn't succeed")
        })
        .catch((x) => {
            done("This should be caught");
        });
    });

    it("fails when extension is not provided", function (done) {
        ngsiConverter('some data')
        .then((x) => {
            done.fail("This shouldn't succeed")
        })
        .catch((x) => {
            done("This should be caught");
        });
    });
});